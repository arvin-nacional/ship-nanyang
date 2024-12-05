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
  address: string;
  contactNumber: string;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  picture: { type: String, required: true },
  role: { type: String, default: "user" },
  address: { type: String },
  joinedAt: { type: Date, default: Date.now },
  contactNumber: { type: String },
});

const User = models.User || model("User", UserSchema);

export default User;
