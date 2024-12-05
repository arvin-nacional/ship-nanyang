"use server";

import User from "@/database/user.model";
import dbConnect from "../mongoose";
import { CreateUserParams } from "./shared.types";

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
