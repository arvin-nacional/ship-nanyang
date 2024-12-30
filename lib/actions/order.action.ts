"use server";
import Order from "@/database/order.model";
import dbConnect from "../mongoose";
import Package from "@/database/package.model";
import Address from "@/database/address.model";
import { UpdateOrderParams } from "./shared.types";

export async function getOrdersByUserId(userId: string) {
  try {
    dbConnect();

    const orders = await Order.find({ user: userId });

    if (!orders) {
      throw new Error("No orders found for this clerk");
    } else {
      const formattedOrders = orders.map((order) => ({
        ...order.toObject(),
        _id: order._id.toString(),
      }));

      return { orders: formattedOrders };
    }
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

export async function getAllOrders() {
  try {
    dbConnect();

    const orders = await Order.find();

    if (!orders) {
      throw new Error("No orders found");
    } else {
      const formattedOrders = orders.map((order) => ({
        ...order.toObject(),
        _id: order._id.toString(),
      }));

      return { orders: formattedOrders };
    }
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
