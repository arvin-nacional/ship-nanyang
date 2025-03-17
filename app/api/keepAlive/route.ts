import { NextResponse } from "next/server";

export async function GET() {
  console.log(`[KeepAlive] Triggered at ${new Date().toISOString()}`);
  return NextResponse.json({ message: "Server is alive!" });
}
