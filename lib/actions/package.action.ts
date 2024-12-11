"use server";

import User from "@/database/user.model";
import dbConnect from "../mongoose";
import { createPackageParams } from "./shared.types";
import Package from "@/database/package.model";
import Order from "@/database/order.model";

export async function createPackage(params: createPackageParams) {
  try {
    dbConnect();

    const { clerkId, trackingNumber, address, description, value, vendor } =
      params;

    const user = await User.findOne({ clerkId });

    const newPackage = await Package.create({
      trackingNumber,
      address,
      description,
      value,
      vendor,
    });

    const newOrder = await Order.create({
      user: user._id,
      status: "Pending",
      packages: [newPackage._id],
    });

    const formatOrder = {
      ...newOrder.toObject(),
      _id: newOrder._id.toString(),
      user: newOrder.user.toString(),
      packages: newOrder.packages.map((p: any) => p.toString()),
    };

    const formatPackage = {
      ...newPackage.toObject(),
      _id: newPackage._id.toString(),
      address: newPackage.address.toString(),
    };

    return { order: formatOrder, package: formatPackage };
  } catch (error) {
    console.log(error);
    throw new Error("Error creating package");
  }
}
