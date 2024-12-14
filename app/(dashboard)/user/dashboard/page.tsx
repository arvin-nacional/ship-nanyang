import { getUserIdByClerkId, isUserVerified } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { redirect } from "next/navigation";
import RightSidebar from "@/components/RightSidebar";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { PackageFilters } from "@/constants/filters";
import Filter from "@/components/shared/search/Filter";
import PackageList from "@/components/ui/packageList";
import { getOrdersByUserId } from "@/lib/actions/order.action";

const page = async () => {
  const { userId } = await auth();

  const verificationResult = userId
    ? await isUserVerified({ clerkId: userId })
    : null;

  if (verificationResult?.verified === false) {
    redirect("/create-account");
  }

  if (!userId) {
    throw new Error("User ID is null");
  }
  const user = await getUserIdByClerkId({ clerkId: userId });

  const result = await getOrdersByUserId(user.userId);
  console.log(result);

  return (
    <div className="flex w-full">
      <div className="p-12 w-full" style={{ height: "90vh" }}>
        <p className="h2-semibold text-primary-500 mb-5">All Packages</p>
        <div className="mb-6 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchbar
            route="/user/packages"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search Packages"
            otherClasses="flex-1"
          />
          <Filter
            filters={PackageFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
          />
        </div>
        {result.orders.map((item) => (
          <div key={item._id}>
            <PackageList
              packageName={item.name}
              status={item.status}
              packageId={item._id}
            />
          </div>
        ))}
      </div>
      <RightSidebar />
    </div>
  );
};

export default page;
