import { getRecentlyAddedPackages } from "@/lib/actions/package.action";
import Link from "next/link";
import React from "react";

const RecentlyAddedPackage = async () => {
  const result = await getRecentlyAddedPackages();
  console.log(result);
  return (
    <div className="background-light800_darkgradient text-dark300_light900 max-w-sm  rounded p-5 text-left text-lg shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
      <div className="flex flex-col items-start justify-between ">
        <div className="mb-2 flex w-[326px] items-center justify-between gap-[22px]w-full">
          <div className="font-semibold">Recently Added Packages</div>
          <div className=" rounded-md px-0 py-2 text-dark-400">
            <Link href="/admin/packages" className="subtle-medium ">
              View All
            </Link>
          </div>
        </div>

        {result?.map((item) => (
          <div
            key={item._id}
            className="mb-2 flex w-[326px] items-center justify-between gap-[10px] border-b border-red-500 pb-2 mx-2"
          >
            <div className="flex flex-col gap-1 ">
              <p className="small-regular">Cart Name</p>
              <Link href={`/admin/shipping-carts/${item.orderId._id}`}>
                <p className="body-regular text-primary-500">
                  {item.orderId.name}
                </p>
              </Link>
            </div>
            <div className="flex flex-col gap-1 w-[150px] items-end">
              <p className="small-regular">Tracking Number</p>
              <p className="body-regular">{item.trackingNumber}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAddedPackage;
