"use server";

import User from "@/database/user.model";
import dbConnect from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByClerkIdParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Address from "@/database/address.model";

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

export async function deleteUser(params: DeleteUserParams) {
  try {
    dbConnect();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // delete address from database
    // delete orders from database

    return { user };
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting user");
  }
}

export async function getUserIdByClerkId(params: GetUserByClerkIdParams) {
  try {
    dbConnect();

    const { clerkId } = params;

    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    return { userId: user._id.toString() }; // Convert ObjectId to string
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching user ID");
  }
}

export async function getUserByClerkId(params: GetUserByClerkIdParams) {
  try {
    dbConnect();

    const { clerkId } = params;

    const user = await User.findOne({ clerkId }).populate("address");
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
      addressId,
    } = params;

    console.log({ params: params });

    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.privacyPolicyAccepted = privacyPolicyAccepted;
    user.verified = true;

    // Create or update address in the address collection
    const address = {
      name: `${firstName} ${lastName}`,
      userId: user._id,
      addressLine1,
      addressLine2,
      city,
      province,
      postalCode,
      contactNumber,
    };
    console.log(addressId);

    let userAddress;
    if (addressId) {
      userAddress = await Address.findByIdAndUpdate(addressId, address, {
        new: true,
      });
    } else {
      userAddress = await Address.create(address);
    }
    user.address = userAddress._id;
    await user.save();

    const userWithFormattedDate = {
      ...user.toObject(),
      _id: user._id.toString(), // Convert ObjectId to string
      joinedAt: user.joinedAt.toISOString(), // Format Date to ISO string
      address: user.address.toString(),
    };
    revalidatePath(path);
    return { user: userWithFormattedDate };
  } catch (error) {
    console.log(error);
    throw new Error("Error updating user");
  }
}
