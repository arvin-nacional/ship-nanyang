import Filter from "@/components/shared/search/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import PackageList from "@/components/ui/packageList";
import { OrderFilters } from "@/constants/filters";
import { getOrdersByUserId } from "@/lib/actions/order.action";
import { getUserById } from "@/lib/actions/user.action";
import { Mail, MapPinHouse, PhoneCallIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

// type tParams = Promise<{ id: string; [key: string]: string | undefined }>;

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const page = async ({ params, searchParams }: PageProps) => {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;

  const result = await getUserById({ userId: id });
  const orders = await getOrdersByUserId({
    searchQuery: resolvedSearchParams.q,
    filter: resolvedSearchParams.filter,
    page: resolvedSearchParams.page ? +resolvedSearchParams.page : 1,
    clerkId: result.user.clerkId,
  });
  return (
    <div className="w-full p-12 max-sm:p-6">
      {/* <p className="h2-bold text-primary-500 mb-5">User Profile</p> */}
      <div className="flex gap-5 bg-light-800 p-6 rounded-md shadow-md max-sm:flex-col">
        <Image
          src={result.user.picture}
          alt="user photo"
          height={100}
          width={100}
          className="rounded-md"
        />
        <div>
          <p className="h2-semibold text-dark-200">
            {result.user.firstName + " " + result.user.lastName}
          </p>
          <div className="flex gap-2 items-center">
            <Mail size={16} className="inline-block text-primary-500" />
            <p className="paragraph-medium text-dark-500">
              {result.user.email}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <PhoneCallIcon
              size={16}
              className="inline-block text-primary-500"
            />
            <p className="paragraph-medium text-dark-500">
              {result.user.address.contactNumber}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <MapPinHouse size={16} className="inline-block text-primary-500" />
            <p>
              {result.user.address.addressLine1 +
                " " +
                result.user.address.addressLine2 +
                " " +
                result.user.address.city +
                " " +
                result.user.address.province +
                " " +
                result.user.address.postalCode}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full mt-12">
        <div className="mb-6 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchbar
            route={`/admin/users/${id}`}
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
        {orders.orders.length !== 0 ? (
          orders.orders.map((item) => (
            <div key={item._id}>
              <PackageList
                packageName={item.name}
                status={item.status}
                packageId={item._id}
              />
            </div>
          ))
        ) : (
          <p className="h2-semibold text-dark-300 p-2">No Orders</p>
        )}
      </div>
    </div>
  );
};

export default page;
