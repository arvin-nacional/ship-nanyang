import Filter from "@/components/shared/search/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import PackageList from "@/components/ui/packageList";
import { OrderFilters } from "@/constants/filters";
import { getAllOrders } from "@/lib/actions/order.action";
import React from "react";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/search/Pagination";

const page = async ({ searchParams }: SearchParamsProps) => {
  const resolvedSearchParams = await searchParams;
  const result = await getAllOrders({
    searchQuery: resolvedSearchParams.q,
    filter: resolvedSearchParams.filter,
    page: resolvedSearchParams.page ? +resolvedSearchParams.page : 1,
  });

  return (
    <div className="flex w-full">
      <div className="p-12 w-full max-sm:p-6" style={{ height: "90vh" }}>
        <p className="h2-semibold text-primary-500 mb-5">All Carts</p>
        <div className="mb-6 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchbar
            route="/admin/shipping-carts"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search Packages"
            otherClasses="flex-1"
          />
          <Filter
            filters={OrderFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
          />
        </div>

        {result.orders.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            No Shipping Carts.
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
    </div>
  );
};

export default page;
