import { NextResponse } from "next/server";

import User from "@/database/user.model";

import dbConnect from "@/lib/mongoose";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) throw new Error("User not found");

  try {
    await dbConnect();

    const user = await User.findOne({ clerkId: id });
    if (!user) throw new Error("User not found");

    return NextResponse.json(
      { success: true, data: JSON.stringify(user) },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
