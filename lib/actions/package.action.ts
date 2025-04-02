/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import User from "@/database/user.model";
import dbConnect from "../mongoose";
import {
  createPackageParams,
  FilterQueryParams,
  UpdatePackageParams,
  userPackagesParams,
} from "./shared.types";
import Package from "@/database/package.model";
import Order from "@/database/order.model";
import Counter from "@/database/counter.model";
import Address from "@/database/address.model";
import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";

async function getNextSequence(name: string): Promise<number> {
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

export async function createPackage(params: createPackageParams) {
  try {
    await dbConnect();

    const {
      clerkId,
      trackingNumber,
      address,
      description,
      value,
      vendor,
      type,
      orderId,
    } = params;
    const orderNumber = await getNextSequence("orderNumber");
    const user = await User.findOne({ clerkId });

    const newPackage = await Package.create({
      trackingNumber,
      description,
      value,
      vendor,
    });

    if (type === "singleOrder") {
      const orderName = `SD-#${orderNumber + 1000}`;

      let newOrder;
      try {
        newOrder = await Order.create({
          name: orderName,
          user: user._id,
          status: "created",
          packages: [newPackage._id],
          address: address,
        });
      } catch (err) {
        await Package.findByIdAndDelete(newPackage._id);
        console.error("Error creating order:", err);
        throw new Error("Failed to create order");
      }

      const formatOrder = {
        ...newOrder.toObject(),
        _id: newOrder._id.toString(),
        user: newOrder.user.toString(),
        packages: newOrder.packages.map((p: any) => p.toString()),
        address: newOrder.address.toString(),
      };
      newPackage.orderId = newOrder._id;
      newPackage.userId = user._id;
      newPackage.save();
      const formatPackage = {
        ...newPackage.toObject(),
        _id: newPackage._id.toString(),
        orderId: newOrder._id.toString(),
        userId: user._id.toString(),
      };

      return { order: formatOrder, package: formatPackage };
    } else if (type === "consolidation") {
      newPackage.orderId = orderId;
      newPackage.userId = user._id;
      await Order.findByIdAndUpdate(orderId, {
        $push: { packages: newPackage._id },
      });

      newPackage.save();

      const formatPackage = {
        ...newPackage.toObject(),
        _id: newPackage._id.toString(),
        orderId: orderId.toString(),
        userId: user._id.toString(),
      };
      return { package: formatPackage };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error creating package");
  }
}

export async function getPackagesWithAddressDetails(
  params: userPackagesParams
) {
  try {
    dbConnect();

    const { searchQuery, filter, page = 1, pageSize = 10, clerkId } = params;

    const user = await User.findOne({ clerkId });

    // Calculcate the number of attendees to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;
    // Initialize the Query
    const query: FilterQuery<typeof Order> = { user };

    if (searchQuery) {
      query.$or = [
        { trackingNumber: { $regex: searchQuery, $options: "i" } },
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { vendor: { $regex: searchQuery, $options: "i" } },
        {
          $or: [
            {
              packages: {
                $in: await Package.find({
                  trackingNumber: { $regex: new RegExp(searchQuery, "i") },
                }).distinct("_id"),
              },
            },
          ],
        },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "all":
        sortOptions = { createdAt: -1 };
        break;
      case "pending":
        query.status = "pending";
        break;
      case "in-warehouse":
        query.status = "in-warehouse";
        break;
      case "preparing":
        query.status = "preparing";
        break;
      case "in-transit":
        query.status = "in-transit";
        break;
      case "out-for-delivery":
        query.status = "out-for-delivery";
        break;
      case "delivered":
        query.status = "delivered";
        break;
      case "failed-delivery-attempt":
        query.status = "failed-delivery-attempt";
        break;
      case "previous-orders":
        sortOptions = { createdAt: 1 };
        break;
      default:
        break;
    }
    const orders = await Order.find(query)
      .populate({
        path: "packages",
        model: Package,
      })
      .populate({
        path: "address",
        model: Address,
      })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    // Extract packages from orders and include the order name
    const packages = orders.flatMap((order) =>
      order.packages.map(
        (pkg: { toObject: () => any; _id: { toString: () => any } }) => ({
          ...pkg.toObject(),
          _id: pkg._id.toString(),
          orderName: order.name, // Include the order name
          address: order.address.toObject(),
          packageId: order._id.toString(),
        })
      )
    );

    return packages;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving packages");
  }
}

export async function getPackagesByUserId(params: userPackagesParams) {
  try {
    dbConnect();

    const { searchQuery, filter, page = 1, pageSize = 10, clerkId } = params;

    const user = await User.findOne({ clerkId });

    // Calculcate the number of attendees to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;
    // Initialize the Query

    const query: FilterQuery<typeof Package> = { userId: user._id };

    if (searchQuery) {
      query.$or = [
        { trackingNumber: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { vendor: { $regex: searchQuery, $options: "i" } },
        {
          orderId: {
            $in: await Order.find({
              $or: [
                {
                  name: { $regex: searchQuery, $options: "i" },
                },
              ],
            }),
          },
        },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "all":
        sortOptions = { createdAt: -1 };
        break;
      case "pending":
        query.status = "pending";
        break;
      case "in-warehouse":
        query.status = "in-warehouse";
        break;
      case "preparing":
        query.status = "preparing";
        break;
      case "in-transit":
        query.status = "in-transit";
        break;
      case "out-for-delivery":
        query.status = "out-for-delivery";
        break;
      case "delivered":
        query.status = "delivered";
        break;
      case "failed-delivery-attempt":
        query.status = "failed-delivery-attempt";
        break;
      case "previous-orders":
        sortOptions = { createdAt: 1 };
        break;
      default:
        break;
    }

    const packages = await Package.find(query)
      .populate({
        path: "orderId",
        model: Order,
        populate: {
          path: "address",
          model: Address,
        },
      })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalPackages = await Package.countDocuments(query);

    const isNext = totalPackages > skipAmount + packages.length;

    const formattedPackages = packages.map((pkg) => ({
      ...pkg.toObject(),
      _id: pkg._id.toString(),
      orderId: pkg.orderId._id.toString(),
      orderName: pkg.orderId.name,
      address: pkg.orderId.address?.toObject() || null,
      userId: user._id.toString(),
    }));

    return { formattedPackages, isNext };
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving packages");
  }
}

export async function getAllPackagesWithAddressDetails(
  params: FilterQueryParams
) {
  try {
    dbConnect();

    const { searchQuery, filter, page = 1, pageSize = 7 } = params;

    // Calculcate the number of packages to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Package> = {};

    if (searchQuery) {
      query.$or = [
        { trackingNumber: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { vendor: { $regex: searchQuery, $options: "i" } },
        {
          orderId: {
            $in: await Order.find({
              $or: [
                {
                  name: { $regex: searchQuery, $options: "i" },
                },
              ],
            }),
          },
        },
      ];
    }

    let sortOptions = {};
    if (!filter) {
      sortOptions = { createdAt: -1 };
    }

    switch (filter) {
      case "all":
        sortOptions = { createdAt: -1 };
        break;
      case "pending":
        query.status = "pending";
        break;
      case "in-warehouse":
        query.status = "in-warehouse";
        break;
      case "preparing":
        query.status = "preparing";
        break;
      case "in-transit":
        query.status = "in-transit";
        break;
      case "out-for-delivery":
        query.status = "out-for-delivery";
        break;
      case "delivered":
        query.status = "delivered";
        break;
      case "failed-delivery-attempt":
        query.status = "failed-delivery-attempt";
        break;
      case "previous-orders":
        sortOptions = { createdAt: 1 };
        break;
      default:
        break;
    }

    const packages = await Package.find(query)
      .populate({
        path: "orderId",
        model: Order,
        populate: {
          path: "address",
          model: Address,
        },
      })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalPackages = await Package.countDocuments(query);

    const isNext = totalPackages > skipAmount + packages.length;

    // Format the result
    const formattedPackages = packages.map((pkg) => ({
      ...pkg.toObject(),
      _id: pkg._id.toString(),
      orderId: pkg.orderId._id.toString(),
      orderName: pkg.orderId.name,
      address: pkg.orderId.address?.toObject() || null,
    }));

    return { formattedPackages, isNext };
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving packages with address details");
  }
}

export async function removePackage(packageId: string, pathname: string) {
  try {
    // Find the package by ID
    const pkg = await Package.findById(packageId);
    if (!pkg) {
      throw new Error("Package not found");
    }

    // Find the order that references this package
    const order = await Order.findOne({ packages: packageId });

    if (order) {
      // Remove the package from the order
      order.packages.pull(packageId);
      await order.save();
    }

    // Delete the package
    await Package.findByIdAndDelete(packageId);

    // Revalidate the path
    revalidatePath(pathname);

    return { message: "Package removed successfully" };
  } catch (error) {
    console.log(error);
    throw new Error("Error removing package");
  }
}

export async function getPackageById(packageId: string) {
  try {
    const pkg = await Package.findById(packageId);
    if (!pkg) {
      throw new Error("Package not found");
    }

    const formatPackage = {
      ...pkg.toObject(),
      _id: pkg._id.toString(),
    };

    return formatPackage;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving package");
  }
}

export async function updatePackage(params: UpdatePackageParams) {
  try {
    dbConnect();

    const {
      packageId,
      description,
      value,
      trackingNumber,
      shipmentPrice,
      status,
    } = params;

    const pkg = await Package.findById(packageId);
    if (!pkg) {
      throw new Error("Package not found");
    }

    pkg.description = description;
    pkg.value = value;
    pkg.trackingNumber = trackingNumber;
    pkg.finalAmount = shipmentPrice;
    pkg.status = status;

    await pkg.save();

    revalidatePath(`/admin/shipping-carts/${pkg.orderId} `);

    return { message: "Package updated successfully" };
  } catch (error) {
    console.log(error);
    throw new Error("Error updating package");
  }
}

export async function getPendingPackageCount() {
  try {
    const pendingCount = await Package.countDocuments({ status: "pending" });
    return pendingCount;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving pending package count");
  }
}
export async function getRecentlyAddedPackages(limit: number = 5) {
  try {
    const recentPackages = await Package.find()
      .populate({ path: "orderId", model: Order })
      .sort({ createdAt: -1 })
      .limit(limit);

    const formattedPackages = recentPackages.map((pkg) => ({
      ...pkg.toObject(),
      _id: pkg._id.toString(),
    }));

    return formattedPackages;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving recently added packages");
  }
}
