"use server";

import Booking from "@/database/booking.model";
import dbConnect from "../mongoose";
import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";

const PAGE_SIZE = 10;

export async function createBooking(params: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  shippingNeed: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}) {
  try {
    await dbConnect();

    const booking = await Booking.create({
      ...params,
      preferredDate: new Date(params.preferredDate),
    });

    revalidatePath("/admin/bookings");

    return { success: true, id: booking._id.toString() };
  } catch (error) {
    console.error("createBooking error:", error);
    return { success: false, error: "Failed to create booking" };
  }
}

export async function getAllBookings(params: {
  searchQuery?: string;
  filter?: string;
  page?: number;
  pageSize?: number;
}) {
  try {
    await dbConnect();

    const { searchQuery, filter, page = 1, pageSize = PAGE_SIZE } = params;
    const skip = (page - 1) * pageSize;

    const query: FilterQuery<typeof Booking> = {};

    if (filter && filter !== "all") {
      query.status = filter;
    }

    if (searchQuery) {
      query.$or = [
        { firstName: { $regex: searchQuery, $options: "i" } },
        { lastName: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
        { company: { $regex: searchQuery, $options: "i" } },
      ];
    }

    const totalCount = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const isNext = totalCount > skip + bookings.length;

    return {
      bookings: JSON.parse(JSON.stringify(bookings)),
      isNext,
      totalCount,
    };
  } catch (error) {
    console.error("getAllBookings error:", error);
    throw error;
  }
}

export async function updateBookingStatus(params: {
  id: string;
  status: "new" | "contacted" | "scheduled" | "completed" | "cancelled";
}) {
  try {
    await dbConnect();
    await Booking.findByIdAndUpdate(params.id, { status: params.status });
    revalidatePath("/admin/bookings");
    return { success: true };
  } catch (error) {
    console.error("updateBookingStatus error:", error);
    return { success: false };
  }
}

export async function deleteBooking(id: string) {
  try {
    await dbConnect();
    await Booking.findByIdAndDelete(id);
    revalidatePath("/admin/bookings");
    return { success: true };
  } catch (error) {
    console.error("deleteBooking error:", error);
    return { success: false };
  }
}
