import Filter from "@/components/shared/search/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import PackageList from "@/components/ui/packageList";
import { PackageFilters } from "@/constants/filters";
import { getAllOrders } from "@/lib/actions/order.action";
import React from "react";

const page = async () => {
  const result = await getAllOrders();
  return (
    <div className="flex w-full">
      <div className="p-12 w-full" style={{ height: "90vh" }}>
        <p className="h2-semibold text-primary-500 mb-5">All Carts</p>
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
    </div>
  );
};

export default page;
