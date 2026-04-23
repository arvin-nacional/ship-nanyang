import { Schema, models, model, Document } from "mongoose";

export interface IBooking extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  shippingNeed: string;
  preferredDate: Date;
  preferredTime: string;
  message: string;
  status: "new" | "contacted" | "scheduled" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String, default: "" },
    shippingNeed: { type: String, default: "" },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "scheduled", "completed", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true }
);

const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);

export default Booking;
