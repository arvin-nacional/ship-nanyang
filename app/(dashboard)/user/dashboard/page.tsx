import { getUserIdByClerkId, isUserVerified } from "@/lib/actions/user.action";
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

  // redirect to sign if not authenticated
  if (!userId) {
    redirect("/signin");
  }

  // check if user is in the database
  const user = await getUserIdByClerkId({ clerkId: userId });

  // check if user is verified
  if (user) {
    const verificationResult = userId
      ? isUserVerified({ clerkId: userId })
      : null;

    if (verificationResult?.verified === false) {
      redirect("/create-account");
    }
  }

  // get the search params
  const resolvedSearchParams = await searchParams;

  // get the orders
  const result = await getOrdersByUserId({
    searchQuery: resolvedSearchParams.q,
    filter: resolvedSearchParams.filter,
    page: resolvedSearchParams.page ? +resolvedSearchParams.page : 1,
    clerkId: userId,
  });

  return (
    <div className="flex w-full max-sm:flex-col">
      <div className="max-sm:p-6 p-12 w-full overflow-scroll h-[90vh] max-sm:h-full">
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
        {result.orders.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            No Shipping Carts. Create one now!
          </div>
        )}
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
