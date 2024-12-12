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
      isDefault,
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
      isDefault,
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

export async function setDefaultAddress(
  addressId: string,
  clerkId: string,
  path: string
) {
  try {
    dbConnect();

    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found with the given clerkId");
    }

    const address = await Address.findById(addressId);
    if (!address) {
      throw new Error("Address not found with the given addressId");
    }

    user.address = addressId;
    await user.save();
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function isAddressOwnedByUser(addressId: string, clerkId: string) {
  try {
    dbConnect();

    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found with the given clerkId");
    }

    const address = await Address.findById(addressId);
    if (!address) {
      throw new Error("Address not found with the given addressId");
    }

    // Compare ObjectId strings
    return user.address.toString() === address._id.toString();
  } catch (error) {
    console.log(error);
    throw new Error("Error checking address ownership");
  }
}

export async function updateAddress(
  addressId: string,
  addressData: Partial<createAddressParams>
) {
  try {
    dbConnect();

    const { clerkId, isDefault } = addressData;

    // Find the user associated with the clerkId
    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found with the given clerkId");
    }

    // If the new address is set as default, update any existing default address
    if (isDefault === true) {
      const existingDefaultAddress = await Address.findOne({
        userId: user._id,
        isDefault: true,
      });

      if (existingDefaultAddress) {
        // Set the previous default address to false
        existingDefaultAddress.isDefault = false;
        await existingDefaultAddress.save();
      }
    }

    // Update the current address with the provided data
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      addressData,
      { new: true } // Return the updated document
    );

    if (!updatedAddress) {
      throw new Error("Address not found");
    }

    // Update the user's default address reference if needed
    if (isDefault === true) {
      user.address = addressId;
      await user.save();
    }

    // Format the updated address for response
    const formattedAddress = {
      ...updatedAddress.toObject(),
      _id: updatedAddress._id.toString(),
      userId: updatedAddress.userId.toString(),
    };

    return { address: formattedAddress };
  } catch (error) {
    console.error(error);
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
