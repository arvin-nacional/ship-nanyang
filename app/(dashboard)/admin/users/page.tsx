import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
// import { PackageFilters } from "@/constants/filters";
// import Filter from "@/components/shared/search/Filter";
import React from "react";
import { getAllUsers } from "@/lib/actions/user.action";
import UserList from "@/components/ui/userList";
import { SearchParamsProps } from "@/types";

const page = async ({ searchParams }: SearchParamsProps) => {
  const resolvedSearchParams = await searchParams;

  const result = await getAllUsers({
    searchQuery: resolvedSearchParams.q,
    filter: resolvedSearchParams.filter,
    page: resolvedSearchParams.page ? +resolvedSearchParams.page : 1,
  });
  console.log(result);
  return (
    <div className="w-full p-12 max-sm:p-6">
      <p className="h2-semibold text-primary-500 mb-5">All Users</p>
      <div className="mb-6 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/admin/users"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search Packages"
          otherClasses="flex-1"
        />
        {/* <Filter
          filters={PackageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        /> */}
      </div>
      {result.users.map((item) => (
        <UserList
          key={item._id}
          name={item.firstName + " " + item.lastName}
          phoneNumber={item.address?.contactNumber}
          id={item._id}
          email={item.email}
          photo={item.picture}
          address={item.address?.city}
        />
      ))}
    </div>
  );
};

export default page;
