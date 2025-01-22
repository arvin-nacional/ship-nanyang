import Profile from "@/components/forms/Profile";
import { getUserByClerkIdFromCreate } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Page = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User ID is null");
  }
  const result = await getUserByClerkIdFromCreate({ clerkId: userId });

  return (
    <div className="w-full p-12 min-h-[90vh] max-sm:p-6">
      <div className="w-full flex justify-center items-center ">
        <div className="w-3/4 max-sm:w-full mt-12">
          <p className="h2-bold text-primary-500 mb-5">
            To proceed, please complete your user profile.
          </p>
          <Profile type="Create" profileDetails={JSON.stringify(result.user)} />
        </div>
      </div>
    </div>
  );
};

export default Page;
