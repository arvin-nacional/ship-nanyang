"use server";
import Order from "@/database/order.model";
import dbConnect from "../mongoose";
import Package from "@/database/package.model";
import Address from "@/database/address.model";
import {
  FilterQueryParams,
  GetUserOrderParams,
  UpdateOrderParams,
} from "./shared.types";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";

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
        query.status = "previous-orders";
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
        query.status = "previous-orders";
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

    order.save();
  } catch (error) {
    console.log(error);
    throw new Error("Error updating order status");
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
