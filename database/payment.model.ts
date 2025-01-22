import { Schema, model, models, Document } from "mongoose";

export interface IPayment extends Document {
  orderId: Schema.Types.ObjectId;
  paymentMethod: string;
  status: string;
  paidAt: Date;
  updatedAt: Date;
  remarks?: string;
}

const PaymentSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, required: true },
  paidAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  remarks: { type: String },
});

const Payment = models.Payment || model("Payment", PaymentSchema);
export default Payment;
