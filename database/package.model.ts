import { Schema, models, model, Document } from "mongoose";

export interface IPackage extends Document {
  createdAt: Date;
  updatedAt: Date;
  order: Schema.Types.ObjectId;
  estimatedAmount: number;
  finalAmount?: number;
  trackingNumber: string[];
  address: Schema.Types.ObjectId;
  vendor: string;
}

const PackageSchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  estimatedAmount: { type: Number },
  finalAmount: { type: Number },
  trackingNumber: { type: [String], default: [] },
  vendor: { type: String, required: true },
  address: { type: Schema.Types.ObjectId, ref: "Address", required: true },
});

const Package = models.Package || model("Package", PackageSchema);
export default Package;
