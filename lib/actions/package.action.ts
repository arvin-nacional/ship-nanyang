/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import User from "@/database/user.model";
import mongoose from "mongoose";
import dbConnect from "../mongoose";
import {
  createPackageParams,
  FilterQueryParams,
  UpdatePackageParams,
  userPackagesParams,
} from "./shared.types";
import Package from "@/database/package.model";
import Order from "@/database/order.model";
// import Counter from "@/database/counter.model";
import Address from "@/database/address.model";
import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";

// async function getNextSequence(name: string): Promise<number> {
//   const counter = await Counter.findOneAndUpdate(
//     { name },
//     { $inc: { seq: 1 } },
//     { new: true, upsert: true }
//   );
//   return counter.seq;
// }

export async function createPackage(params: createPackageParams) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    dbConnect();
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

    // Validate required fields
    if (!clerkId || !trackingNumber || !description || !vendor) {
      throw new Error("Missing required fields");
    }

    const user = await User.findOne({ clerkId }).session(session);
    if (!user) {
      throw new Error("User not found");
    }

    // Create the package within transaction
    const [newPackage] = await Package.create(
      [
        {
          trackingNumber,
          description,
          value,
          vendor,
          userId: user._id,
        },
      ],
      { session }
    );

    if (type === "singleOrder") {
      if (!address) {
        throw new Error("Address is required for single order");
      }

      // const orderNumber = await getNextSequence("orderNumber");
      // if (!orderNumber) {
      //   throw new Error("Failed to generate order number");
      // }

      // const orderName = `SD-#${orderNumber + 1000}`;

      // Generate order number without separate counter collection
      const lastOrder = await Order.findOne(
        {},
        {},
        { sort: { createdAt: -1 }, session }
      );
      const orderNumber = lastOrder
        ? parseInt(lastOrder.name.split("#")[1]) - 999
        : 1;
      const orderName = `SD-#${orderNumber + 1000}`;

      // Create order within the same transaction
      const [newOrder] = await Order.create(
        [
          {
            name: orderName,
            user: user._id,
            status: "created",
            packages: [newPackage._id],
            address: address,
          },
        ],
        { session }
      );

      // Update package with order reference
      await Package.findByIdAndUpdate(
        newPackage._id,
        { orderId: newOrder._id },
        { session }
      );

      await session.commitTransaction();

      return {
        order: formatOrder(newOrder),
        package: formatPackage(newPackage),
      };
    } else if (type === "consolidation") {
      if (!orderId) {
        throw new Error("Order ID is required for consolidation");
      }

      // Verify the order exists and belongs to the user
      const existingOrder = await Order.findOne({
        _id: orderId,
      }).session(session);

      if (!existingOrder) {
        throw new Error("Order not found or access denied");
      }

      // Update both package and order within transaction
      await Package.findByIdAndUpdate(newPackage._id, { orderId }, { session });

      await Order.findByIdAndUpdate(
        orderId,
        { $push: { packages: newPackage._id } },
        { session }
      );

      await session.commitTransaction();

      return {
        package: formatPackage(newPackage),
      };
    } else {
      throw new Error("Invalid package type");
    }
  } catch (error) {
    await session.abortTransaction();
    console.error("Transaction aborted:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to complete package creation"
    );
  } finally {
    await session.endSession();
  }
}

// Helper functions
function formatOrder(order: any) {
  return {
    ...order.toObject(),
    _id: order._id.toString(),
    user: order.user.toString(),
    packages: order.packages.map((p: any) => p.toString()),
    address: order.address.toString(),
  };
}

function formatPackage(pkg: any) {
  return {
    ...pkg.toObject(),
    _id: pkg._id.toString(),
    orderId: pkg.orderId?.toString(),
    userId: pkg.userId.toString(),
  };
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

    const { searchQuery, filter, page = 1, pageSize = 6 } = params;

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
  dbConnect();
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
    dbConnect();
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
