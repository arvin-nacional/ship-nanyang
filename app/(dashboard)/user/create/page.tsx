import Profile from "@/components/forms/Profile";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Page = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User ID is null");
  }
  const result = await getUserByClerkId({ clerkId: userId });

  return (
    <div className="w-full py-12 min-h-[90vh]">
      <div className="w-full flex justify-center items-center ">
        <div className="w-3/4 max-sm:w-full">
          <Profile type="Create" profileDetails={JSON.stringify(result.user)} />
        </div>
      </div>
    </div>
  );
};

export default Page;
