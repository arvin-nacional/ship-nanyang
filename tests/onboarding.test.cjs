const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");

// Run the real TS modules with isolated Clerk/MongoDB/Next adapters. No live
// accounts or database are touched, and no additional test runtime is needed.
function loadModule(relativePath, mocks = {}, cache = new Map()) {
  const filename = path.resolve(root, relativePath);
  if (cache.has(filename)) return cache.get(filename).exports;
  const module = { exports: {} };
  cache.set(filename, module);
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    fileName: filename,
  }).outputText;
  const localRequire = (name) => {
    if (Object.hasOwn(mocks, name)) return mocks[name];
    if (name === "server-only") return {};
    if (name.startsWith("@/components/")) return () => null;
    if (name.startsWith(".") || name.startsWith("@/")) {
      const base = name.startsWith("@/")
        ? path.join(root, name.slice(2))
        : path.resolve(path.dirname(filename), name);
      const resolved = [base, base + ".ts", base + ".tsx"].find(
        (candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile()
      );
      return loadModule(path.relative(root, resolved), mocks, cache);
    }
    return require(name);
  };
  vm.runInThisContext(
    "(function(require, module, exports) {" + source + "\n})",
    { filename }
  )(localRequire, module, module.exports);
  return module.exports;
}

const validProfile = {
  clerkId: "user_test",
  firstName: "Test",
  lastName: "Customer",
  email: "customer@example.com",
  contactNumber: "09123456789",
  addressLine1: "123 Test Street",
  addressLine2: "Barangay Test",
  city: "Manila",
  province: "Metro Manila",
  postalCode: "1000",
  privacyPolicyAccepted: true,
  path: "/create-account",
  formType: "Create",
};
const completeUser = {
  ...validProfile,
  verified: true,
  address: { ...validProfile },
};
const { isOnboardingComplete } = loadModule("lib/onboarding.ts");

test("only persisted, complete required details count as onboarding complete", () => {
  assert.equal(isOnboardingComplete(completeUser), true);
  for (const user of [null, {}, { verified: true },
    { ...completeUser, verified: false },
    { ...completeUser, privacyPolicyAccepted: false },
    { ...completeUser, firstName: "   " },
    { ...completeUser, address: null },
    { ...completeUser, address: { ...completeUser.address, contactNumber: "" } },
  ]) assert.equal(isOnboardingComplete(user), false);
});

function redirect(destination) {
  throw new Error("REDIRECT:" + destination);
}

function pageMocks({ userId = "user_test", role, profile = completeUser } = {}) {
  return {
    "@clerk/nextjs/server": {
      auth: async () => ({ userId, sessionClaims: { userType: role } }),
      currentUser: async () => ({ firstName: "Test" }),
    },
    "next/navigation": { redirect },
    "@/lib/actions/user.action": {
      getUserByClerkIdFromCreate: async () => ({ user: profile }),
      isUserVerified: async () => ({ verified: isOnboardingComplete(profile) }),
    },
  };
}

test("onboarding routes signed-out users to sign-in and completed users to dashboard", async () => {
  const file = "app/(root)/create-account/page.tsx";
  await assert.rejects(loadModule(file, pageMocks({ userId: null })).default(), /REDIRECT:\/signin/);
  await assert.rejects(loadModule(file, pageMocks()).default(), /REDIRECT:\/user\/dashboard/);
  await assert.rejects(loadModule(file, pageMocks({ role: "admin", profile: null })).default(), /REDIRECT:\/admin\/dashboard/);
});

test("missing metadata and an incomplete profile render the required-details form", async () => {
  const page = loadModule("app/(root)/create-account/page.tsx", pageMocks({ profile: {} }));
  assert.ok(await page.default());
});

test("dashboard layout redirects incomplete users even with verified Clerk claims", async () => {
  const mocks = pageMocks({ profile: { verified: true } });
  mocks["@clerk/nextjs/server"].auth = async () => ({
    userId: "user_test", sessionClaims: { userType: "user", verified: true },
  });
  const layout = loadModule("app/(dashboard)/layout.tsx", mocks);
  await assert.rejects(layout.default({ children: null }), /REDIRECT:\/create-account/);
});

test("dashboard accepts saved profiles with absent metadata and exempts admins", async () => {
  for (const state of [{}, { role: "admin", profile: null }]) {
    const layout = loadModule("app/(dashboard)/layout.tsx", pageMocks(state));
    assert.ok(await layout.default({ children: null }));
  }
});

test("both auth components force sign-up and sign-in transfers through onboarding", () => {
  for (const [name, transfer] of [["SignUp", "signInForceRedirectUrl"], ["SignIn", "signUpForceRedirectUrl"]]) {
    const component = loadModule("components/auth/" + name + ".tsx", {
      "@clerk/nextjs": { SignUp: () => null, SignIn: () => null },
    });
    const props = component.default().props.children.props;
    assert.equal(props.forceRedirectUrl, "/create-account");
    assert.equal(props[transfer], "/create-account");
  }
});

function actionFixture(options = {}) {
  const calls = [];
  const user = {
    ...validProfile, verified: false, _id: "mongo-user", address: undefined,
    joinedAt: new Date("2026-01-01"),
    toObject() { return { ...this }; },
    async populate() { return this; },
    async save() {
      calls.push("save");
      if (options.saveFails) throw new Error("Database write failed");
    },
  };
  const mocks = {
    "@/database/user.model": { findOne: async () => options.missing ? null : user },
    "@/database/address.model": {
      findOneAndUpdate: async (filter) => {
        calls.push("address");
        assert.equal(filter.userId, user._id);
        assert.equal(filter._id, user.address || user._id);
        if (options.addressFails) throw new Error("Address write failed");
        return { _id: filter._id };
      },
    },
    "../mongoose": async () => { calls.push("connect"); },
    "../user-provisioning": {
      ensureUserRecord: async (data) => {
        calls.push("provision");
        assert.equal(data.email, "primary@example.com");
        return user;
      },
    },
    "next/cache": { revalidatePath: () => calls.push("revalidate") },
    "@clerk/nextjs/server": {
      auth: async () => ({ userId: options.userId === undefined ? "user_test" : options.userId }),
      currentUser: async () => ({
        id: "user_test", firstName: "Test", lastName: "Customer", imageUrl: "",
        primaryEmailAddressId: "primary",
        emailAddresses: [
          { id: "secondary", emailAddress: "secondary@example.com" },
          { id: "primary", emailAddress: "primary@example.com" },
        ],
      }),
      clerkClient: async () => ({ users: { updateUserMetadata: async () => {
        calls.push("metadata");
        if (options.metadataFails) throw new Error("Clerk unavailable");
      } } }),
    },
  };
  return { actions: loadModule("lib/actions/user.action.ts", mocks), calls, user };
}

test("first onboarding request provisions a missing user without waiting for a webhook", async () => {
  const { actions, calls } = actionFixture({ missing: true });
  const result = await actions.getUserByClerkIdFromCreate({ clerkId: "user_test" });
  assert.equal(result.user._id, "mongo-user");
  assert.deepEqual(calls, ["connect", "provision"]);
});

test("existing onboarding users do not require another Clerk lookup or provisioning", async () => {
  const { actions, calls } = actionFixture();
  await actions.getUserByClerkIdFromCreate({ clerkId: "user_test" });
  assert.deepEqual(calls, ["connect"]);
});

test("unauthenticated and cross-user writes are rejected before touching the database", async () => {
  for (const userId of [null, "another_user"]) {
    const { actions, calls } = actionFixture({ userId });
    await assert.rejects(actions.updateUser(validProfile), /Unauthorized/);
    await assert.rejects(actions.getUserByClerkIdFromCreate({ clerkId: "user_test" }), /Unauthorized/);
    assert.deepEqual(calls, []);
  }
});

test("invalid required details and unaccepted privacy policy cannot be saved", async () => {
  for (const changes of [{ privacyPolicyAccepted: false }, { contactNumber: "   " }, { city: "" }]) {
    const { actions, calls } = actionFixture();
    await assert.rejects(actions.updateUser({ ...validProfile, ...changes }));
    assert.deepEqual(calls, []);
  }
});

test("details persist before Clerk completion; retries use the same owned address", async () => {
  const { actions, calls, user } = actionFixture();
  await actions.updateUser({ ...validProfile, addressId: "someone-elses-address" });
  await actions.updateUser(validProfile);
  assert.equal(user.verified, true);
  assert.equal(user.address, "mongo-user");
  assert.deepEqual(calls, ["connect", "address", "save", "metadata", "revalidate",
    "connect", "address", "save", "metadata", "revalidate"]);
});

test("failed address or user persistence never marks Clerk onboarding complete", async () => {
  for (const options of [{ addressFails: true }, { saveFails: true }]) {
    const { actions, calls } = actionFixture(options);
    await assert.rejects(actions.updateUser(validProfile), /write failed/);
    assert.equal(calls.includes("metadata"), false);
    assert.equal(calls.includes("revalidate"), false);
  }
});

test("Clerk metadata outages do not turn a saved profile into a failed submission", async () => {
  const { actions, calls, user } = actionFixture({ metadataFails: true });
  const result = await actions.updateUser(validProfile);
  assert.equal(result.user.verified, true);
  assert.equal(user.verified, true);
  assert.equal(calls.at(-1), "revalidate");
});

test("webhook/onboarding provisioning is insert-only and recovers duplicate-key races", async () => {
  const existing = { ...completeUser, firstName: "Saved name" };
  const calls = [];
  const module = loadModule("lib/user-provisioning.ts", {
    "./mongoose": async () => calls.push("connect"),
    "@/database/user.model": {
      init: async () => calls.push("index"),
      findOneAndUpdate: async (filter, update, options) => {
        calls.push("upsert");
        assert.deepEqual(filter, { clerkId: "user_test" });
        assert.deepEqual(Object.keys(update), ["$setOnInsert"]);
        assert.equal(options.upsert, true);
        throw Object.assign(new Error("Concurrent insert"), { code: 11000 });
      },
      findOne: async () => existing,
    },
  });
  const result = await module.ensureUserRecord({ ...validProfile, picture: "" });
  assert.equal(result.firstName, "Saved name");
  assert.equal(result.verified, true);
  assert.deepEqual(calls, ["connect", "index", "upsert"]);
});

test("webhook verifies the unchanged raw body and safely handles replayed creation events", async () => {
  const originalSecret = process.env.SIGNING_SECRET;
  process.env.SIGNING_SECRET = "test-secret";
  const body = '{ "type": "user.created", "data": {} }\n';
  const saved = { ...completeUser, firstName: "Previously saved" };
  let deliveries = 0;
  const route = loadModule("app/api/webhook/route.ts", {
    svix: { Webhook: class {
      verify(received) {
        assert.equal(received, body);
        return { type: "user.created", data: {
          id: "user_test", first_name: "Old name", last_name: "Customer", image_url: "",
          primary_email_address_id: "primary",
          email_addresses: [
            { id: "secondary", email_address: "old@example.com" },
            { id: "primary", email_address: "primary@example.com" },
          ],
        } };
      }
    } },
    "next/headers": { headers: async () => new Headers({
      "svix-id": "test", "svix-timestamp": "test", "svix-signature": "test",
    }) },
    "next/server": { NextResponse: { json: (value) => value } },
    "@/lib/actions/user.action": {},
    "@/lib/user-provisioning": { ensureUserRecord: async (data) => {
      deliveries++;
      assert.equal(data.email, "primary@example.com");
      return saved;
    } },
  });
  try {
    for (let attempt = 0; attempt < 2; attempt++) {
      const result = await route.POST(new Request("https://example.com/api/webhook", {
        method: "POST", body,
      }));
      assert.equal(result.user.firstName, "Previously saved");
      assert.equal(result.user.verified, true);
    }
    assert.equal(deliveries, 2);
  } finally {
    if (originalSecret === undefined) delete process.env.SIGNING_SECRET;
    else process.env.SIGNING_SECRET = originalSecret;
  }
});
