import Profile from "@/components/forms/Profile";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import React from "react";

type tParams = Promise<{ id: string }>;

const Page = async ({ params }: { params: tParams }) => {
  const { id } = await params;
  const result = await getUserByClerkId({ clerkId: id });

  // // Convert the user object to a plain object
  // const plainUser = result?.user

  //       userId: result.user?._id,
  //       firstName: result.user?.firstName,
  //       lastName: result.user?.lastName,
  //       email: result.user?.email,
  //       postalCode: result.user?.postalCode,
  //       country: result.user?.country,
  //       privacyPolicyAccepted: result.user?.privacyPolicyAccepted,
  //       addressLine1: result.user?.addressLine1,
  //       addressLine2: result.user?.addressLine2,
  //       city: result.user?.city,
  //       province: result.user?.province,
  //       contactNumber: result.user?.contactNumber,
  //     }
  //   : null;
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
