import { isUserVerified } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { redirect } from "next/navigation";
import RightSidebar from "@/components/RightSidebar";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { OrderFilters } from "@/constants/filters";
import Filter from "@/components/shared/search/Filter";
import PackageList from "@/components/ui/packageList";
import { getOrdersByUserId } from "@/lib/actions/order.action";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/search/Pagination";

const page = async ({ searchParams }: SearchParamsProps) => {
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

  const resolvedSearchParams = await searchParams;

  const result = await getOrdersByUserId({
    searchQuery: resolvedSearchParams.q,
    filter: resolvedSearchParams.filter,
    page: resolvedSearchParams.page ? +resolvedSearchParams.page : 1,
    clerkId: userId,
  });

  return (
    <div className="flex w-full max-sm:flex-col">
      <div className="max-sm:p-6 p-12 w-full overflow-scroll h-[90vh]">
        <p className="h2-semibold text-primary-500 mb-5">All Carts</p>
        <div className="mb-6 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchbar
            route="/user/dashboard"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search Shipping Carts"
            otherClasses="flex-1"
          />
          <Filter
            filters={OrderFilters}
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

        <div className="mt-10">
          <Pagination
            pageNumber={
              resolvedSearchParams?.page ? +resolvedSearchParams.page : 1
            }
            isNext={result.isNext}
          />
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default page;
