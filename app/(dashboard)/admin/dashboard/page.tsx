import Summary from "@/components/charts/Summary";
import RecentlyAddedPackage from "@/components/dashboard/RecentlyAddedPackage";
import RecentlyAddedUsers from "@/components/dashboard/RecentlyAddedUsers";

import React from "react";

const page = async () => {
  return (
    <div className="flex flex-col w-full p-12 max-sm:p-6">
      <div className="w-full">
        <Summary />
      </div>
      <div className="mt-6 flex flex-wrap gap-5">
        <RecentlyAddedUsers />
        <RecentlyAddedPackage />
      </div>
    </div>
  );
};

export default page;
