import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import PackageListItem from "@/components/ui/packageListItem";
import { PackageFilters } from "@/constants/filters";
import Filter from "@/components/shared/search/Filter";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { getAllPackagesWithAddressDetails } from "@/lib/actions/package.action";
import { formatDate } from "@/lib/utils";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/search/Pagination";

const page = async ({ searchParams }: SearchParamsProps) => {
  const resolvedSearchParams = await searchParams;
  const result = await getAllPackagesWithAddressDetails({
    searchQuery: resolvedSearchParams.q,
    filter: resolvedSearchParams.filter,
    page: resolvedSearchParams.page ? +resolvedSearchParams.page : 1,
  });

  const { sessionClaims } = await auth();
  const userType = (sessionClaims?.userType as string) || "user";

  return (
    <div className="p-12 w-full max-sm:p-6" style={{ minHeight: "90vh" }}>
      <p className="h2-semibold text-primary-500 mb-5">All Packages</p>
      <div className="mb-6 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/admin/packages"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search Items"
          otherClasses="flex-1"
        />
        <Filter
          filters={PackageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      {result?.formattedPackages?.map((item) => (
        <div key={item._id}>
          <PackageListItem
            recipient={item.address.name}
            date={formatDate(item.createdAt)}
            packageName={item.orderName}
            status={item.status}
            trackingNumber={item.trackingNumber}
            description={item.description}
            packageId={item.orderId}
            finalAmount={item.finalAmount}
            userType={userType}
            vendor={item.vendor}
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
  );
};

export default page;
