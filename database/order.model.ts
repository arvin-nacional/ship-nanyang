import { Schema, models, model, Document } from "mongoose";

export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  paymentStatus: string;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
  paymentLink: string;
  finalAmount?: number;
  packages: Schema.Types.ObjectId[];
  name: string;
  address: Schema.Types.ObjectId;
  insurance: number;
  localDeliveryFee: number;
  miscellaneousFee: number;
}

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, required: true },
  paymentStatus: { type: String, default: "pending" },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  paymentLink: { type: String },
  finalAmount: { type: Number },
  packages: [{ type: Schema.Types.ObjectId, ref: "Package" }],
  name: { type: String },
  address: { type: Schema.Types.ObjectId, ref: "Address" },
  insurance: { type: Number },
  localDeliveryFee: { type: Number },
  miscellaneousFee: { type: Number },
});

const Order = models.Order || model<IOrder>("Order", OrderSchema);

export default Order;
