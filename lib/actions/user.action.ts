"use server";

import User from "@/database/user.model";
import dbConnect from "../mongoose";
import { CreateUserParams, GetUserByClerkIdParams } from "./shared.types";

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
    return { user };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching user");
  }
}
