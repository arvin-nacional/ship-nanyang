import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  password?: string;
  name: string;
  role: string;
  picture: string;
  joinedAt: Date;
  orders: Schema.Types.ObjectId[];
  address: string;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  picture: { type: String, required: true },
  role: { type: String, default: "user" },
  address: { type: String },
  joinedAt: { type: Date, default: Date.now },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

const User = models.User || model("User", UserSchema);

export default User;
