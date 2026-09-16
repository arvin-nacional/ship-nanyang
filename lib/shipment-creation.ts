import "server-only";

import { createHash } from "node:crypto";
import mongoose from "mongoose";
import User from "@/database/user.model";
import Address from "@/database/address.model";
import Order from "@/database/order.model";
import Package from "@/database/package.model";
import Counter from "@/database/counter.model";
import dbConnect from "./mongoose";
import { CreateOrderSchema } from "./validations";
import { z } from "zod";

export class ShipmentInputError extends Error {}

const counterId = new mongoose.Types.ObjectId("736869706d656e7463617274");

async function initializeCounter() {
  if (await Counter.findById(counterId)) return;
  // Seed from the greatest valid historical number, not the most recent date.
  const [highest] = await Order.aggregate([
    { $match: { name: /^SD-#\d+$/ } },
    { $project: { number: { $convert: { input: { $arrayElemAt: [{ $split: ["$name", "#"] }, 1] }, to: "double", onError: 1000, onNull: 1000 } } } },
    { $group: { _id: null, number: { $max: "$number" } } },
  ]);
  try {
    await Counter.updateOne(
      { _id: counterId },
      { $setOnInsert: { name: "shipment-cart-number", seq: Math.max(1000, highest?.number || 1000) } },
      { upsert: true }
    );
  } catch (error) {
    // Concurrent first requests use the same intrinsically unique _id.
    if ((error as { code?: number }).code !== 11000 || !await Counter.findById(counterId)) throw error;
  }
}

type ShipmentInput = z.infer<typeof CreateOrderSchema> & { clerkId: string };

export async function persistShipment(input: ShipmentInput, actorId: string, isAdmin: boolean, requestId: string) {
  await dbConnect();
  const packageId = new mongoose.Types.ObjectId(createHash("sha256").update(`${actorId}:${requestId}`).digest("hex").slice(0, 24));
  const fingerprint = createHash("sha256").update(JSON.stringify({
    clerkId: input.clerkId, vendor: input.vendor, trackingNumber: input.trackingNumber,
    description: input.description, value: input.value, type: input.type,
    destination: input.type === "singleOrder" ? input.address : input.orderId,
  })).digest("hex");

  const resultFor = (pkg: { _id: mongoose.Types.ObjectId; orderId?: mongoose.Types.ObjectId; creationFingerprint?: string }) => {
    if (pkg.creationFingerprint !== fingerprint) throw new ShipmentInputError("This submission changed. Please submit it again with a new request.");
    if (!pkg.orderId) throw new Error("Saved shipment has no cart");
    return { packageId: pkg._id.toString(), orderId: pkg.orderId.toString() };
  };

  const existing = await Package.findById(packageId);
  if (existing) return resultFor(existing);
  if (input.type === "singleOrder") await initializeCounter();

  const session = await mongoose.startSession();
  const deadline = Date.now() + 20000;
  let attempts = 0;
  try {
    return await session.withTransaction(async () => {
      if (++attempts > 5 || Date.now() > deadline) throw new Error("Shipment transaction retry budget exhausted");
      const previous = await Package.findById(packageId).session(session);
      if (previous) return resultFor(previous);

      let order;
      let owner;
      if (input.type === "consolidation") {
        order = await Order.findById(input.orderId).session(session);
        if (!order) throw new ShipmentInputError("This cart no longer exists. Please select another cart.");
        owner = await User.findById(order.user).session(session);
        if (!owner || (!isAdmin && owner.clerkId !== actorId)) throw new ShipmentInputError("You cannot add a shipment to this cart.");
      } else {
        owner = await User.findOne({ clerkId: input.clerkId }).session(session);
        if (!owner) throw new ShipmentInputError("Please complete your account profile before adding a shipment.");
        const address = await Address.findById(input.address).session(session);
        if (!address || (!isAdmin && address.userId.toString() !== owner._id.toString())) {
          throw new ShipmentInputError("This delivery address is unavailable. Please select another address.");
        }
        const counter = await Counter.findByIdAndUpdate(counterId, { $inc: { seq: 1 } }, { new: true, session });
        if (!counter || !Number.isSafeInteger(counter.seq)) throw new Error("Invalid cart counter");
        [order] = await Order.create([{
          name: `SD-#${counter.seq}`, user: owner._id, status: "created", address: address._id, packages: [],
        }], { session });
      }

      // Store both links in the same retryable transaction. Admin additions use
      // the existing cart's owner, not the administrator's customer profile.
      const [pkg] = await Package.create([{
        _id: packageId, creationFingerprint: fingerprint,
        vendor: input.vendor, trackingNumber: input.trackingNumber,
        description: input.description, value: input.value,
        userId: owner._id, orderId: order._id,
      }], { session });
      await Order.findByIdAndUpdate(order._id, { $addToSet: { packages: packageId } }, { session });
      return resultFor(pkg);
    }, { maxCommitTimeMS: 5000 });
  } catch (error) {
    // A concurrent identical submission or an uncertain commit may already
    // have succeeded. Resolve that before telling the customer to retry.
    try {
      const saved = await Package.findById(packageId);
      if (saved) return resultFor(saved);
    } catch (lookupError) {
      if (lookupError instanceof ShipmentInputError) throw lookupError;
    }
    throw error;
  } finally {
    await session.endSession().catch(() => {});
  }
}
