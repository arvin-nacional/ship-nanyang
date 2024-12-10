import Profile from "@/components/forms/Profile";
import { getUserByClerkId } from "@/lib/actions/user.action";
import React from "react";

type tParams = Promise<{ id: string }>;

const Page = async ({ params }: { params: tParams }) => {
  const { id } = await params;
  const result = await getUserByClerkId({ clerkId: id });
  console.log(result.user);

  return (
    <div className="w-full py-12 min-h-[90vh]">
      <div className="w-full flex justify-center items-center ">
        <div className="w-3/4 max-sm:w-full">
          <Profile type="Edit" profileDetails={JSON.stringify(result.user)} />
        </div>
      </div>
    </div>
  );
};

export default Page;
