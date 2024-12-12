import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import PackageListItem from "@/components/ui/packageListItem";
import { PackageFilters } from "@/constants/filters";
import Filter from "@/components/shared/search/Filter";
import React from "react";

const page = () => {
  return (
    <div className="p-12 w-full" style={{ minHeight: "90vh" }}>
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
      <PackageListItem />
      <PackageListItem />
    </div>
  );
};

export default page;
