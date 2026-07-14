import Filter from "@/components/shared/search/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import PackageList from "@/components/ui/packageList";
import { OrderFilters } from "@/constants/filters";
import { getOrdersByUserId } from "@/lib/actions/order.action";
import { getUserById } from "@/lib/actions/user.action";
import { Mail, MapPinHouse, PackagePlus, PhoneCallIcon, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
  const user = result?.user;
  const hasAddress = user?.address && Object.keys(user.address).length > 0;
  
  const orders = await getOrdersByUserId({
    searchQuery: resolvedSearchParams.q,
    filter: resolvedSearchParams.filter,
    page: resolvedSearchParams.page ? +resolvedSearchParams.page : 1,
    clerkId: user?.clerkId,
  });
  return (
    <div className="w-full p-12 max-sm:p-6">
      {/* <p className="h2-bold text-primary-500 mb-5">User Profile</p> */}
      <div className="flex gap-5 bg-light-800 p-6 rounded-md shadow-md max-sm:flex-col justify-between items-center">
        <div className="flex gap-5  max-sm:flex-col">
          {user?.picture ? (
            <Image
              src={user.picture}
              alt="user photo"
              height={100}
              width={100}
              className="rounded-md"
            />
          ) : (
            <div className="w-[100px] h-[100px] rounded-md bg-gray-100 flex items-center justify-center">
              <UserCircle size={60} className="text-gray-400" />
            </div>
          )}
          <div>
            <p className="h2-semibold text-dark-200">
              {(user?.firstName || "") + " " + (user?.lastName || "")}
            </p>
            <div className="flex gap-2 items-center">
              <Mail size={16} className="inline-block text-primary-500" />
              <p className="paragraph-medium text-dark-500">
                {user?.email || "No email provided"}
              </p>
            </div>
            {hasAddress ? (
              <>
                <div className="flex gap-2 items-center">
                  <PhoneCallIcon
                    size={16}
                    className="inline-block text-primary-500"
                  />
                  <p className="paragraph-medium text-dark-500">
                    {user.address.contactNumber || "No contact number"}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <MapPinHouse
                    size={16}
                    className="inline-block text-primary-500"
                  />
                  <p>
                    {[
                      user.address.addressLine1,
                      user.address.addressLine2,
                      user.address.city,
                      user.address.province,
                      user.address.postalCode,
                    ]
                      .filter(Boolean)
                      .join(" ") || "No address provided"}
                  </p>
                </div>
              </>
            ) : (
              <div className="mt-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-700">
                  ⚠️ This user has not completed their profile setup.
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <Link href={`/admin/add-package/${id}`}>
            <Button className="px-5 border border-primary-500 hover:bg-primary-400 rounded-3xl w-full bg-primary-500 text-light-800 mb-5">
              <PackagePlus /> Add Package
            </Button>
          </Link>
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
