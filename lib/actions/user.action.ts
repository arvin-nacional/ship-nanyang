"use server";

import User from "@/database/user.model";
import dbConnect from "../mongoose";
import { CreateUserParams } from "./shared.types";
import handleError from "../handlers/error";

export async function createUser(userData: CreateUserParams) {
  try {
    dbConnect();

    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    return handleError(error, "server") as ActionResponse;
  }
}
