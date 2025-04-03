"use server";
import Order from "@/database/order.model";
import dbConnect from "../mongoose";
import Package from "@/database/package.model";
import Address from "@/database/address.model";
import { v2 as cloudinary } from "cloudinary";
import {
  FilterQueryParams,
  GetUserOrderParams,
  SubmitPaymentParams,
  UpdateOrderParams,
} from "./shared.types";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function getOrdersByUserId(params: GetUserOrderParams) {
  try {
    dbConnect();

    const { page = 1, pageSize = 6, filter, searchQuery, clerkId } = params;

    const user = await User.findOne({ clerkId });

    // Calculcate the number of orders to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;
    // Initialize the Query
    const query: FilterQuery<typeof Order> = { user: user._id };
    if (searchQuery) {
      query.$or = [{ name: { $regex: searchQuery, $options: "i" } }];
    }
    let sortOptions = {};
    if (!filter) {
      sortOptions = { createdAt: -1 };
    }

    switch (filter) {
      case "all":
        sortOptions = { createdAt: -1 };
        break;
      case "created":
        query.status = "created";
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
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const formattedOrders = orders.map((order) => ({
      ...order.toObject(),
      _id: order._id.toString(),
      user: user._id.toString(),
      address: order.address.toString(),
    }));

    const totalOrders = await Order.countDocuments(query);

    const isNext = totalOrders > skipAmount + orders.length;

    return { orders: formattedOrders, isNext };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching orders");
  }
}

export async function getOrderById(orderId: string) {
  try {
    dbConnect();

    const order = await Order.findById(orderId)
      .populate({ path: "packages", model: Package })
      .populate({ path: "address", model: Address });

    if (!order) {
      throw new Error("Order not found");
    }

    const formattedOrder = {
      ...order.toObject(),
      _id: order._id.toString(),
    };

    return { order: formattedOrder };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching order");
  }
}

export async function getAllOrders(params: FilterQueryParams) {
  try {
    dbConnect();

    const { page = 1, pageSize = 7, filter, searchQuery } = params;

    // Calculcate the number of packages to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;
    // Initialize the Query

    const query: FilterQuery<typeof Order> = {};
    if (searchQuery) {
      query.$or = [{ name: { $regex: searchQuery, $options: "i" } }];
    }

    let sortOptions = {};
    if (!filter) {
      sortOptions = { createdAt: -1 };
    }

    switch (filter) {
      case "all":
        sortOptions = { createdAt: -1 };
        break;
      case "created":
        query.status = "created";
        break;
      case "for-review":
        query.paymentStatus = "for-review";
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
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalOrders = await Order.countDocuments(query);

    const isNext = totalOrders > skipAmount + orders.length;

    const formattedOrders = orders.map((order) => ({
      ...order.toObject(),
      _id: order._id.toString(),
      user: order.user.toString(),
      address: order.address.toString(),
    }));

    return { orders: formattedOrders, isNext };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching orders");
  }
}

export async function updateOrder(params: UpdateOrderParams) {
  try {
    dbConnect();

    const {
      orderId,
      status,
      finalAmount,
      paymentStatus,
      insurance,
      miscellaneousFee,
      localDeliveryFee,
      discount,
      airwayBillNumber,
    } = params;

    console.log(params);

    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.status = status;
    order.finalAmount = finalAmount;
    order.paymentStatus = paymentStatus;
    order.insurance = insurance;
    order.miscellaneousFee = miscellaneousFee;
    order.localDeliveryFee = localDeliveryFee;
    order.discount = discount;
    order.airwayBillNumber = airwayBillNumber;

    order.save();
  } catch (error) {
    console.log(error);
    throw new Error("Error updating order status");
  }
}

export async function submitPayment(params: SubmitPaymentParams) {
  try {
    dbConnect();

    const { orderId, paymentImages, path } = params;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }
    order.paymentStatus = "for-review";

    // Upload additional images with base64 processing
    const updatedImages = await Promise.all(
      paymentImages.map(async (image) => {
        if (image.src.startsWith("data:image")) {
          // Extract mime type and base64 data
          const mime = image.src.match(/data:(.*?);base64,/)?.[1];
          const base64Data = image.src.split(",")[1];

          if (!mime || !base64Data) {
            throw new Error("Invalid image format");
          }

          const fileUri = `data:${mime};base64,${base64Data}`;

          // Upload to Cloudinary
          const imageUploadResult = await cloudinary.uploader.upload(fileUri, {
            invalidate: true,
          });

          return { src: imageUploadResult.secure_url, alt: image.alt };
        }
        return image;
      })
    );

    order.paymentImages = updatedImages;

    await order.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error("Error submitting payment");
  }
}

export async function getOrderCount() {
  try {
    dbConnect();

    const count = await Order.countDocuments();

    return count;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching order count");
  }
}

export async function getOutForDeliveryOrderCount() {
  try {
    dbConnect();

    const count = await Order.countDocuments({ status: "out-for-delivery" });

    return count;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching out-for-delivery order count");
  }
}

export async function deleteCart(orderId: string) {
  try {
    dbConnect();

    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    // Delete all packages associated with the order
    await Package.deleteMany({ _id: { $in: order.packages } });

    // Delete the order itself
    await Order.findByIdAndDelete(orderId);

    return { message: "Cart and associated packages deleted successfully" };
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting cart");
  }
}
