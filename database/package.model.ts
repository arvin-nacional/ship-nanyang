import { Schema, models, model, Document } from "mongoose";

export interface IPackage extends Document {
  createdAt: Date;
  updatedAt: Date;
  estimatedAmount: number;
  finalAmount?: number;
  trackingNumber: string;
  address: Schema.Types.ObjectId;
  vendor: string;
  value: string;
  description: string;
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
  address: { type: Schema.Types.ObjectId, ref: "Address", required: true },
});

const Package = models.Package || model("Package", PackageSchema);
export default Package;
