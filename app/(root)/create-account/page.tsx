import Profile from "@/components/forms/Profile";
import { getUserByClerkIdFromCreate } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isOnboardingComplete } from "@/lib/onboarding";
import React from "react";

const Page = async () => {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect("/signin");
  }
  if (sessionClaims?.userType === "admin") redirect("/admin/dashboard");

  const result = await getUserByClerkIdFromCreate({ clerkId: userId });
  if (isOnboardingComplete(result.user)) redirect("/user/dashboard");

  return (
    <div className="w-full p-12 min-h-[90vh] max-sm:p-6 max-sm:mt-8">
      <div className="w-full flex justify-center items-center ">
        <div className="w-3/4 max-sm:w-full mt-12">
          <p className="h1-bold text-primary-500 mb-6">
            To proceed, please complete your user profile.
          </p>
          <Profile type="Create" profileDetails={JSON.stringify(result.user)} />
        </div>
      </div>
    </div>
  );
};

export default Page;
