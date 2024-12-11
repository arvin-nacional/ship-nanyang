import { Schema, models, model, Document } from "mongoose";

export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
  paymentLink: string;
  finalAmount?: number;
  packages: Schema.Types.ObjectId[];
}

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  paymentLink: { type: String },
  finalAmount: { type: Number },
  packages: [{ type: Schema.Types.ObjectId, ref: "Package" }],
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
