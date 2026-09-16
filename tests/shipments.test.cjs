const assert = require("node:assert/strict");
const { test } = require("node:test");
const { randomUUID } = require("node:crypto");
const { Types } = require("mongoose");
const { loadModule } = require("./load-ts.cjs");

const ownerId = new Types.ObjectId();
const addressId = new Types.ObjectId();
const existingOrderId = new Types.ObjectId();
const input = {
  clerkId: "customer", vendor: "Shop", trackingNumber: "TRACK-1", value: "12.50",
  description: "Books", type: "singleOrder", address: addressId.toString(), orderId: "",
};
const { CreateOrderSchema } = loadModule("lib/validations.ts");

test("hot reload preserves shipment fingerprints on an already compiled package model", () => {
  const { Mongoose } = require("mongoose");
  const isolated = new Mongoose();
  const cached = isolated.model("Package", new isolated.Schema({ description: String }));
  const Package = loadModule("database/package.model.ts", { mongoose: isolated }).default;
  assert.equal(Package, cached);
  const pkg = new Package({ description: "Books", creationFingerprint: "submission-fingerprint" });
  assert.equal(pkg.creationFingerprint, "submission-fingerprint");
  assert.equal(pkg.toObject().creationFingerprint, "submission-fingerprint");
  const reloaded = loadModule("database/package.model.ts", { mongoose: isolated }).default;
  const hydrated = reloaded.hydrate(pkg.toObject());
  assert.equal(hydrated.creationFingerprint, "submission-fingerprint");
});

test("creation validates the description and only requires the destination for the selected mode", () => {
  assert.equal(CreateOrderSchema.safeParse(input).success, true);
  assert.equal(CreateOrderSchema.safeParse({ ...input, description: " " }).success, false);
  assert.equal(CreateOrderSchema.safeParse({ ...input, type: "other" }).success, false);
  assert.equal(CreateOrderSchema.safeParse({ ...input, address: "" }).success, false);
  assert.equal(CreateOrderSchema.safeParse({ ...input, type: "consolidation", address: "", orderId: existingOrderId.toString() }).success, true);
  assert.equal(CreateOrderSchema.safeParse({ ...input, type: "consolidation", address: undefined, orderId: existingOrderId.toString() }).success, true);
  assert.equal(CreateOrderSchema.safeParse({ ...input, type: "consolidation", orderId: "" }).success, false);
  for (const value of ["", "-1", "not a number"]) assert.equal(CreateOrderSchema.safeParse({ ...input, value }).success, false);
});

// Isolated transactional store: explicitly models rollback and callback replay.
// Driver retry labels and real database isolation still need an integration run.
function fixture(options = {}) {
  let orders = new Map([[existingOrderId.toString(), { _id: existingOrderId, user: ownerId, packages: [], address: addressId }]]);
  let packages = new Map();
  let counter = options.uninitialized ? null : { seq: 1500 };
  let attempts = 0;
  let ended = 0;
  let conflictInjected = false;
  const owner = { _id: ownerId, clerkId: "customer" };
  const query = (get) => ({ then: (resolve, reject) => Promise.resolve().then(get).then(resolve, reject), session() { return this; } });
  const session = {
    async withTransaction(callback) {
      for (;;) {
        const savedOrders = new Map([...orders].map(([key, value]) => [key, { ...value, packages: [...value.packages] }]));
        const savedPackages = new Map(packages);
        const savedCounter = counter && { ...counter };
        attempts++;
        let result;
        try { result = await callback(); }
        catch (error) {
          orders = savedOrders; packages = savedPackages; counter = savedCounter;
          if (error.retry) continue;
          throw error;
        }
        if (options.uncertainCommit) throw Object.assign(new Error("Connection lost after commit"), { code: 91 });
        return result;
      }
    },
    async endSession() { ended++; },
  };
  const mocks = {
    "./mongoose": async () => {},
    mongoose: { Types, startSession: async () => session },
    "@/database/user.model": {
      findOne: ({ clerkId }) => query(() => clerkId === owner.clerkId ? owner : null),
      findById: () => query(() => owner),
    },
    "@/database/address.model": { findById: () => query(() => options.missingAddress ? null : {
      _id: addressId, userId: options.otherAddressOwner ? new Types.ObjectId() : ownerId,
    }) },
    "@/database/counter.model": {
      findById: () => query(() => counter),
      updateOne: async (_, update) => { counter ||= { seq: update.$setOnInsert.seq }; },
      findByIdAndUpdate: async () => { counter.seq++; return { ...counter }; },
    },
    "@/database/order.model": {
      aggregate: async () => [{ number: 1709 }],
      findById: (id) => query(() => orders.get(id.toString()) || null),
      create: async ([data]) => {
        const order = { ...data, _id: new Types.ObjectId() };
        orders.set(order._id.toString(), order); return [order];
      },
      findByIdAndUpdate: async (id, update) => {
        if ((options.conflict && !conflictInjected) || options.persistentConflict) {
          conflictInjected = true;
          throw Object.assign(new Error("Transient write conflict"), { retry: true });
        }
        const order = orders.get(id.toString());
        const packageId = update.$addToSet.packages;
        if (!order.packages.some((entry) => entry.toString() === packageId.toString())) order.packages.push(packageId);
      },
    },
    "@/database/package.model": {
      findById: (id) => query(() => packages.get(id.toString()) || null),
      create: async ([data]) => {
        if (options.writeFails) throw new Error("Package insert failed");
        if (packages.has(data._id.toString())) throw Object.assign(new Error("Duplicate"), { code: 11000 });
        packages.set(data._id.toString(), data); return [data];
      },
    },
  };
  return {
    service: loadModule("lib/shipment-creation.ts", mocks),
    state: () => ({ orders, packages, counter, attempts, ended }),
  };
}

test("new cart and shipment save together with both links and a sequenced number", async () => {
  const { service, state } = fixture({ uninitialized: true });
  const result = await service.persistShipment(input, "customer", false, randomUUID());
  const saved = state();
  assert.equal(saved.orders.get(result.orderId).name, "SD-#1710");
  assert.equal(saved.packages.get(result.packageId).orderId.toString(), result.orderId);
  assert.equal(saved.orders.get(result.orderId).packages[0].toString(), result.packageId);
  assert.equal(saved.ended, 1);
});

test("a transient conflict can replay the transaction without orphaned or duplicate records", async () => {
  const { service, state } = fixture({ conflict: true });
  const result = await service.persistShipment(input, "customer", false, randomUUID());
  assert.equal(state().attempts, 2);
  assert.equal(state().packages.size, 1);
  assert.equal(state().orders.size, 2);
  assert.equal(state().orders.get(result.orderId).name, "SD-#1501");
});

test("failed package insertion rolls back the new cart and its number", async () => {
  const { service, state } = fixture({ writeFails: true });
  await assert.rejects(service.persistShipment(input, "customer", false, randomUUID()), /insert failed/);
  assert.equal(state().orders.size, 1);
  assert.equal(state().packages.size, 0);
  assert.equal(state().counter.seq, 1500);
  assert.equal(state().ended, 1);
});

test("persistent conflicts stop replaying after the retry budget and leave no partial shipment", async () => {
  const { service, state } = fixture({ persistentConflict: true });
  await assert.rejects(service.persistShipment(input, "customer", false, randomUUID()), /retry budget exhausted/);
  assert.equal(state().attempts, 6);
  assert.equal(state().packages.size, 0);
  assert.equal(state().orders.size, 1);
  assert.equal(state().ended, 1);
});

test("retrying an identical submission returns the original cart and shipment", async () => {
  const { service, state } = fixture();
  const key = randomUUID();
  const first = await service.persistShipment(input, "customer", false, key);
  const retry = await service.persistShipment(input, "customer", false, key);
  assert.deepEqual(retry, first);
  assert.equal(state().packages.size, 1);
  assert.equal(state().counter.seq, 1501);
  await assert.rejects(service.persistShipment({ ...input, value: "99" }, "customer", false, key), /submission changed/);
});

test("an uncertain commit resolves the persisted shipment instead of reporting failure", async () => {
  const { service, state } = fixture({ uncertainCommit: true });
  const result = await service.persistShipment(input, "customer", false, randomUUID());
  assert.ok(state().packages.has(result.packageId));
  assert.equal(state().ended, 1);
});

test("admin consolidation attributes the shipment to the cart owner", async () => {
  const { service, state } = fixture();
  const result = await service.persistShipment({ ...input, clerkId: "admin", type: "consolidation",
    address: "", orderId: existingOrderId.toString() }, "admin", true, randomUUID());
  assert.equal(result.orderId, existingOrderId.toString());
  assert.equal(state().packages.get(result.packageId).userId.toString(), ownerId.toString());
  assert.equal(state().counter.seq, 1500);
});

test("customers cannot consolidate into another customer's cart", async () => {
  const { service, state } = fixture();
  await assert.rejects(service.persistShipment({ ...input, type: "consolidation",
    orderId: existingOrderId.toString() }, "other-customer", false, randomUUID()), /cannot add/);
  assert.equal(state().packages.size, 0);
});

test("missing or foreign delivery addresses are rejected before creation", async () => {
  for (const options of [{ missingAddress: true }, { otherAddressOwner: true }]) {
    const { service, state } = fixture(options);
    await assert.rejects(service.persistShipment(input, "customer", false, randomUUID()), /address is unavailable/);
    assert.equal(state().packages.size, 0);
    assert.equal(state().orders.size, 1);
  }
});

function actionFixture(options = {}) {
  let writes = 0;
  const invalidations = [];
  class ShipmentInputError extends Error {}
  const actions = loadModule("lib/actions/package.action.ts", {
    "@clerk/nextjs/server": { auth: async () => ({ userId: options.signedOut ? null : "customer", sessionClaims: {} }) },
    "../shipment-creation": { ShipmentInputError, persistShipment: async () => {
      writes++;
      if (options.failure) throw new Error("Internal database details");
      return { packageId: "package", orderId: "cart" };
    } },
    "../mongoose": async () => {},
    "@/database/user.model": {}, "@/database/address.model": {},
    "@/database/order.model": {}, "@/database/package.model": {},
    "next/cache": { revalidatePath: (...args) => {
      if (options.refreshFails) throw new Error("Cache unavailable");
      invalidations.push(args);
    } },
  });
  return { actions, writes: () => writes, invalidations };
}

test("saving refreshes cart details and lists without invalidating dashboard layouts", async () => {
  const { actions, invalidations } = actionFixture();
  assert.equal((await actions.createPackage(input)).success, true);
  assert.ok(invalidations.every((args) => args.length === 1));
  const paths = invalidations.map(([path]) => path);
  for (const path of ["/user/packages/cart", "/admin/shipping-carts/cart", "/user/packages", "/admin/shipping-carts", "/admin/packages"]) {
    assert.ok(paths.includes(path));
  }
  assert.ok(!paths.includes("/user") && !paths.includes("/admin"));
});

test("action returns useful validation/session failures without writing", async () => {
  for (const [options, params] of [[{ signedOut: true }, input], [{}, { ...input, description: "" }], [{}, { ...input, clerkId: "another-customer" }]]) {
    const { actions, writes } = actionFixture(options);
    const result = await actions.createPackage(params);
    assert.equal(result.success, false);
    assert.equal(writes(), 0);
    assert.ok(result.error);
  }
});

test("production failures return a support reference without leaking the underlying error", async () => {
  const { actions } = actionFixture({ failure: true });
  const requestId = randomUUID();
  const result = await actions.createPackage({ ...input, requestId });
  assert.equal(result.success, false);
  assert.equal(result.reference, requestId);
  assert.doesNotMatch(result.error, /Internal database details/);
});

test("cache refresh failure does not report a successfully persisted shipment as failed", async () => {
  const { actions } = actionFixture({ refreshFails: true });
  assert.equal((await actions.createPackage(input)).success, true);
});

test("client duplicate clicks are suppressed and retry reuses its key until details change", () => {
  const { useShipmentSubmission } = loadModule("hooks/use-shipment-submission.ts", {
    react: { useRef: (current) => ({ current }) },
  });
  const submission = useShipmentSubmission();
  const first = submission.begin(input);
  assert.equal(submission.begin(input), null);
  submission.finish();
  assert.equal(submission.begin(input), first);
  submission.finish();
  assert.notEqual(submission.begin({ ...input, value: "55" }), first);
});

test("customer and admin forms preserve errors and navigate only after confirmed creation", async () => {
  for (const componentName of ["Order", "OrderForUser"]) {
    for (const success of [true, false]) {
      const errors = [];
      const navigation = [];
      let refreshes = 0;
      const toasts = [];
      let work;
      const form = {
        control: {}, formState: { errors: {} }, watch: () => "singleOrder",
        clearErrors() {}, setError: (_, error) => errors.push(error.message),
        handleSubmit: (submit) => () => submit(input),
      };
      const placeholders = new Proxy({}, { get: (_, name) => name });
      const mocks = {
        react: { ...require("react"), useTransition: () => [false, (callback) => { work = callback(); }] },
        "react-hook-form": { useForm: () => form },
        "@clerk/nextjs": { useUser: () => ({ user: { id: "customer" }, isLoaded: true, isSignedIn: true }) },
        "next/navigation": { useRouter: () => ({ push: (url) => navigation.push(url), refresh() { refreshes++; } }) },
        "@/hooks/use-toast": { useToast: () => ({ toast: (value) => toasts.push(value) }) },
        "@/lib/utils": { cn: (...classes) => classes.join(" ") },
        "@/hooks/use-shipment-submission": { useShipmentSubmission: () => ({ begin: () => randomUUID(), finish() {} }) },
        "@/lib/actions/package.action": { createPackage: async () => success
          ? { success: true, orderId: "saved-cart", packageId: "saved-package" }
          : { success: false, error: "Select another address." } },
      };
      for (const name of ["form", "input", "button", "select", "popover", "command"]) mocks["../ui/" + name] = placeholders;
      const component = loadModule("components/forms/" + componentName + ".tsx", mocks).default;
      const tree = component({ user: JSON.stringify({ clerkId: "customer" }), orders: '{"orders":[]}', address: '{"addresses":[]}' });
      const formElement = Array.isArray(tree.props.children) ? tree.props.children[0] : tree.props.children;
      await formElement.props.onSubmit();
      await work;
      assert.equal(refreshes, 0, "navigation must not trigger a competing refresh");
      if (success) {
        assert.equal(navigation[0], componentName === "Order" ? "/user/packages/saved-cart" : "/admin/shipping-carts/saved-cart");
        assert.equal(errors.length, 0);
      } else {
        assert.equal(navigation.length, 0);
        assert.deepEqual(errors, ["Select another address."]);
        assert.equal(toasts[0].variant, "destructive");
      }
    }
  }
});
