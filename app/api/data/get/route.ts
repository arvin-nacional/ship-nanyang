import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://api.exchangerate-api.com/v4/latest/USD"
  );
  const data = await response.json();
  const phpRate = data.rates.PHP;
  return NextResponse.json({ php: phpRate });
}
