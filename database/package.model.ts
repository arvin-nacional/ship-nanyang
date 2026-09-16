import { Schema, models, model, Document } from "mongoose";

export interface IPackage extends Document {
  creationFingerprint?: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedAmount: number;
  finalAmount?: number;
  trackingNumber: string;
  vendor: string;
  value: string;
  description: string;
  paymentStatus: string;
  status: string;
  orderId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
}

const PackageSchema = new Schema({
  creationFingerprint: { type: String },
  description: { type: String, required: true },
  value: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  estimatedAmount: { type: Number },
  finalAmount: { type: Number },
  trackingNumber: { type: String, required: true },
  vendor: { type: String, required: true },
  paymentStatus: { type: String, default: "pending" },
  status: { type: String, default: "pending" },
  orderId: { type: Schema.Types.ObjectId, ref: "Order" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Package = models.Package || model<IPackage>("Package", PackageSchema);
// Next.js hot reload keeps compiled models alive across schema edits. Upgrade
// the cached model too, or strict mode silently drops the idempotency field.
if (!Package.schema.path("creationFingerprint")) {
  Package.schema.add({ creationFingerprint: { type: String } });
  Package.recompileSchema();
}
export default Package;
