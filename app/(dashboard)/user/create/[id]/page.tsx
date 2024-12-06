import Profile from "@/components/forms/Profile";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import React from "react";

const Page = async ({ params }: ParamsProps) => {
  const result = await getUserByClerkId({ clerkId: params.id });
  return (
    <div className="w-full py-12 min-h-[90vh]">
      <div className="w-full flex justify-center items-center ">
        <div className="w-3/4 max-sm:w-full">
          <Profile
            type="create"
            profileDetails={JSON.stringify(result?.user)}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
