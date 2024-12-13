"user server";

import Order from "@/database/order.model";
import dbConnect from "../mongoose";

export async function getOrdersByUserId(userId: string) {
  try {
    dbConnect();

    const orders = await Order.find({ user: userId });

    if (!orders.length) {
      throw new Error("No orders found for this clerk");
    }

    const formattedOrders = orders.map((order) => ({
      ...order.toObject(),
      _id: order._id.toString(),
    }));

    return { orders: formattedOrders };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching orders");
  }
}
