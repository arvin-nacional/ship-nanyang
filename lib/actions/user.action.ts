"use server";

import User from "@/database/user.model";
import dbConnect from "../mongoose";
import {
  DeleteUserParams,
  FilterQueryParams,
  GetUserByClerkIdParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Address from "@/database/address.model";
import { FilterQuery } from "mongoose";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { ensureUserRecord } from "../user-provisioning";
import { isOnboardingComplete } from "../onboarding";
import { ProfileSchema } from "../validations";

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

    const user = await User.findOne({ clerkId }).populate({
      path: "address",
      model: Address,
    });
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

export async function getUserByClerkIdFromCreate(params: GetUserByClerkIdParams) {
  const { userId } = await auth();
  if (!userId || userId !== params.clerkId) throw new Error("Unauthorized");

  await dbConnect();
  let user = await User.findOne({ clerkId: userId });
  if (!user) {
    const clerkUser = await currentUser();
    if (!clerkUser || clerkUser.id !== userId) throw new Error("Unauthorized");
    const email = clerkUser.emailAddresses.find(
      (address) => address.id === clerkUser.primaryEmailAddressId
    )?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress;
    if (!email) throw new Error("Your account needs an email address to continue.");

    user = await ensureUserRecord({
      clerkId: userId,
      firstName: clerkUser.firstName || "",
      lastName: clerkUser.lastName || "",
      email,
      picture: clerkUser.imageUrl,
    });
  }

  await user.populate({ path: "address", model: Address });
  return {
    user: {
      ...user.toObject(),
      _id: user._id.toString(),
      joinedAt: user.joinedAt.toISOString(),
    },
  };
}

export async function updateUser(params: UpdateUserParams) {
  const { userId } = await auth();
  if (!userId || userId !== params.clerkId) throw new Error("Unauthorized");

  // Validate on the server as well as in the browser before any writes.
  const profile = ProfileSchema.parse(params);
  await dbConnect();
  const user = await User.findOne({ clerkId: userId });
  if (!user) throw new Error("User not found");

  const address = {
    name: profile.firstName + " " + profile.lastName,
    userId: user._id,
    addressLine1: profile.addressLine1,
    addressLine2: profile.addressLine2,
    city: profile.city,
    province: profile.province,
    postalCode: profile.postalCode,
    country: profile.country,
    contactNumber: profile.contactNumber,
  };

  // Use the saved address, never an address ID supplied by the browser.
  // A stable ID for the first address also makes retries safe if user.save fails.
  const userAddress = await Address.findOneAndUpdate(
    { _id: user.address || user._id, userId: user._id },
    { $set: address, $setOnInsert: { isDefault: true } },
    { upsert: true, new: true, runValidators: true }
  );

  user.firstName = profile.firstName;
  user.lastName = profile.lastName;
  user.privacyPolicyAccepted = profile.privacyPolicyAccepted;
  user.address = userAddress._id;
  user.verified = true;
  await user.save();

  // MongoDB is authoritative. Clerk metadata is a mirror; a failed sync must
  // not make a successfully saved form look like a failure or block access.
  try {
    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { verified: true },
    });
  } catch (error) {
    console.error("Profile saved, but Clerk metadata sync failed:", error);
  }

  revalidatePath("/", "layout");
  return {
    user: {
      ...user.toObject(),
      _id: user._id.toString(),
      joinedAt: user.joinedAt.toISOString(),
      address: user.address.toString(),
    },
  };
}

export async function isUserVerified(params: GetUserByClerkIdParams) {
  const { userId } = await auth();
  if (!userId || userId !== params.clerkId) throw new Error("Unauthorized");

  await dbConnect();
  const user = await User.findOne({ clerkId: userId }).populate({
    path: "address",
    model: Address,
  });
  return { verified: isOnboardingComplete(user) };
}

export async function getUserCount() {
  try {
    dbConnect();

    const userCount = await User.countDocuments();

    return userCount;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching user count");
  }
}

export async function getRecentUsers() {
  try {
    dbConnect();

    const recentUsers = await User.find()
      .sort({ joinedAt: -1 })
      .limit(5)
      .populate("address");

    const usersWithFormattedDate = recentUsers.map((user) => ({
      ...user.toObject(),
      _id: user._id.toString(), // Convert ObjectId to string
      joinedAt: user.joinedAt.toISOString(), // Format Date to ISO string
    }));

    return { users: usersWithFormattedDate };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching recent users");
  }
}

export async function getAllUsers(params: FilterQueryParams) {
  try {
    dbConnect();

    const { searchQuery, page = 1, pageSize = 7 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { firstName: { $regex: searchQuery, $options: "i" } },
        { lastName: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
      ];
    }

    const users = await User.find(query)
      .populate("address")
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsers = await User.countDocuments(query);
    const isNext = totalUsers > skipAmount + users.length;

    const usersWithFormattedDate = users.map((user) => ({
      ...user.toObject(),
      _id: user._id.toString(), // Convert ObjectId to string
      joinedAt: user.joinedAt.toISOString(), // Format Date to ISO string
    }));

    return { users: usersWithFormattedDate, isNext };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching all users");
  }
}

export async function getUserById(params: GetUserByIdParams) {
  try {
    dbConnect();

    const { userId } = params;

    const user = await User.findById(userId).populate({
      path: "address",
      model: Address,
    });
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
