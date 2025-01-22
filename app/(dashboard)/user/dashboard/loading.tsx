"use client";
import RightSidebar from "@/components/RightSidebar";
import Filter from "@/components/shared/search/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { OrderFilters } from "@/constants/filters";
import React from "react";
import GridLoader from "react-spinners/GridLoader";
const loading = () => {
  return (
    <div className="flex w-full max-sm:flex-col">
      <div className="p-12 w-full overflow-scroll h-[90vh] max-sm:h-full">
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
        <div className="flex justify-center items-center ">
          <GridLoader color="#3B82F6" size={15} />
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default loading;
