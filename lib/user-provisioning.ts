import "server-only";

import User from "@/database/user.model";
import dbConnect from "./mongoose";
import { CreateUserParams } from "./actions/shared.types";

// Shared by the signed-in onboarding request and the verified Clerk webhook.
// Late/repeated webhooks must never overwrite completed profile details.
export async function ensureUserRecord(userData: CreateUserParams) {
  await dbConnect();
  // Wait for the unique clerkId index before allowing concurrent upserts.
  await User.init();

  try {
    return await User.findOneAndUpdate(
      { clerkId: userData.clerkId },
      { $setOnInsert: userData },
      { upsert: true, new: true, runValidators: true }
    );
  } catch (error) {
    // Another request may have inserted the same account in the meantime.
    if ((error as { code?: number }).code === 11000) {
      const existing = await User.findOne({ clerkId: userData.clerkId });
      if (existing) return existing;
    }
    throw error;
  }
}
