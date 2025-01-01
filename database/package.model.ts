import { Schema, models, model, Document } from "mongoose";

export interface IPackage extends Document {
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
export default Package;
