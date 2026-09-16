/* eslint-disable camelcase */

import { Webhook } from "svix";
import { headers } from "next/headers";
import { deleteUser } from "@/lib/actions/user.action";
import { ensureUserRecord } from "@/lib/user-provisioning";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const body = await req.text();

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);

  if (eventType === "user.created") {
    const { id, email_addresses, primary_email_address_id, first_name, last_name, image_url } = evt.data;
    const email = email_addresses.find(
      (address) => address.id === primary_email_address_id
    )?.email_address || email_addresses[0]?.email_address;
    if (!email) return new Response("User email is missing", { status: 400 });

    // Create user in database
    const mongoUser = await ensureUserRecord({
      clerkId: id,
      firstName: `${first_name || ""}`,
      lastName: `${last_name || ""}`,
      email,
      picture: image_url,
    });

    return NextResponse.json({ success: true, user: mongoUser });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    // Delete user in database
    const deletedUser = await deleteUser({ clerkId: id! });

    return NextResponse.json({ success: true, user: deletedUser });
  }

  return new Response("Webhook received", { status: 200 });
}
