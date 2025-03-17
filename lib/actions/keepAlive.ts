"use server";

import dbConnect from "../mongoose";

export async function keepAlive() {
  try {
    await dbConnect();
    return { message: "I'm alive!" };
  } catch (error) {
    console.log(error);
    throw new Error("Error keeping alive");
  }
}
