"user server";

import Order from "@/database/order.model";
import dbConnect from "../mongoose";
import Package from "@/database/package.model";
import Address from "@/database/address.model";

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
