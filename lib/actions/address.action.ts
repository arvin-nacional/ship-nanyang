"use server";

import Address from "@/database/address.model";
import dbConnect from "../mongoose";
import { createAddressParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function createAddress(addressData: createAddressParams) {
  try {
    dbConnect();

    const {
      clerkId,
      addressLine1,
      addressLine2,
      city,
      province,
      postalCode,
      contactNumber,
      path,
      name,
    } = addressData;
    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }
    addressData.clerkId = user._id;
    const newAddress = await Address.create({
      addressLine1,
      addressLine2,
      city,
      province,
      postalCode,
      contactNumber,
      userId: user._id,
      name,
    });

    const formattedAddress = {
      ...newAddress.toObject(),
      _id: newAddress._id.toString(),
      userId: newAddress.userId.toString(),
    };

    revalidatePath(path);
    return { address: formattedAddress };
  } catch (error) {
    console.log(error);
    throw new Error("Error creating address");
  }
}

export async function updateAddress(
  addressId: string,
  addressData: Partial<createAddressParams>
) {
  try {
    dbConnect();

    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      addressData,
      { new: true }
    );

    if (!updatedAddress) {
      throw new Error("Address not found");
    }

    const formattedAddress = {
      ...updatedAddress.toObject(),
      _id: updatedAddress._id.toString(),
      userId: updatedAddress.userId.toString(),
    };

    return { address: formattedAddress };
  } catch (error) {
    console.log(error);
    throw new Error("Error updating address");
  }
}

export async function deleteAddress(addressId: string) {
  try {
    dbConnect();

    const deletedAddress = await Address.findByIdAndDelete(addressId);

    if (!deletedAddress) {
      throw new Error("Address not found");
    }

    await User.updateOne({ _id: deletedAddress.userId }, { address: null });

    const formattedAddress = {
      ...deletedAddress.toObject(),
      _id: deletedAddress._id.toString(),
      userId: deletedAddress.userId.toString(),
    };

    return { address: formattedAddress };
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting address");
  }
}

export async function getAddressById(addressId: string) {
  try {
    dbConnect();

    const address = await Address.findById(addressId);

    if (!address) {
      throw new Error("Address not found");
    }

    const formattedAddress = {
      ...address.toObject(),
      _id: address._id.toString(),
      userId: address.userId.toString(),
    };

    return { address: formattedAddress };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching address");
  }
}

export async function getAddressByUserId(userId: string) {
  try {
    dbConnect();

    const addresses = await Address.find({ userId });

    if (!addresses.length) {
      throw new Error("No addresses found for this user");
    }

    const formattedAddresses = addresses.map((address) => ({
      ...address.toObject(),
      _id: address._id.toString(),
      userId: address.userId.toString(),
    }));

    return { addresses: formattedAddresses };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching addresses");
  }
}
