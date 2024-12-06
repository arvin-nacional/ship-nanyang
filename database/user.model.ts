import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: string;
  picture: string;
  joinedAt: Date;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  contactNumber: string;
  privacyPolicyAccepted: boolean;
  verified: boolean;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  picture: { type: String, required: true },
  role: { type: String, default: "user" },
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String },
  province: { type: String },
  postalCode: { type: String },
  country: { type: String },
  joinedAt: { type: Date, default: Date.now },
  contactNumber: { type: String },
  verified: { type: Boolean, default: false },
  privacyPolicyAccepted: { type: Boolean, default: false },
});

const User = models.User || model("User", UserSchema);

export default User;
