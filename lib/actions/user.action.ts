"use server";

import User from "@/database/user.model";
import dbConnect from "../mongoose";
import {
  CreateUserParams,
  GetUserByClerkIdParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";

export async function createUser(userData: CreateUserParams) {
  try {
    dbConnect();

    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating user");
  }
}

export async function getUserByClerkId(params: GetUserByClerkIdParams) {
  try {
    dbConnect();

    const { clerkId } = params;

    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    const userWithFormattedDate = {
      ...user.toObject(),
      _id: user._id.toString(), // Convert ObjectId to string
      joinedAt: user.joinedAt.toISOString(), // Format Date to ISO string
    };
    return { user: userWithFormattedDate };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching user");
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    dbConnect();

    const {
      clerkId,
      firstName,
      lastName,
      contactNumber,
      email,
      addressLine1,
      addressLine2,
      city,
      province,
      postalCode,
      privacyPolicyAccepted,
      path,
    } = params;

    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.contactNumber = contactNumber;
    user.email = email;
    user.addressLine1 = addressLine1;
    user.addressLine2 = addressLine2;
    user.city = city;
    user.province = province;
    user.postalCode = postalCode;
    user.privacyPolicyAccepted = privacyPolicyAccepted;
    user.verified = true;

    await user.save();

    const userWithFormattedDate = {
      ...user.toObject(),
      _id: user._id.toString(), // Convert ObjectId to string
      joinedAt: user.joinedAt.toISOString(), // Format Date to ISO string
    };
    revalidatePath(path);
    return { user: userWithFormattedDate };
  } catch (error) {
    console.log(error);
    throw new Error("Error updating user");
  }
}
