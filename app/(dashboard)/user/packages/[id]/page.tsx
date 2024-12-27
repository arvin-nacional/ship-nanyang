/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import PackageItem from "@/components/ui/packageItem";
import { getOrderById } from "@/lib/actions/order.action";
import { formatDate } from "@/lib/utils";
import { PackagePlus, PhilippinePeso } from "lucide-react";
import Link from "next/link";
import React from "react";
type tParams = Promise<{ id: string }>;
const page = async ({ params }: { params: tParams }) => {
  const { id } = await params;

  const result = await getOrderById(id);
  return (
    <div className="w-full min-h-[90vh] p-12 flex flex-col items-between">
      <div className="h-full">
        <p className="h2-semibold text-dark-300 mb-5">Shipping Cart Details</p>
        <div className="flex justify-between  mb-10 items-end">
          <div className="flex flex-wrap gap-10">
            <div className="flex flex-col">
              <p className="paragraph-regular text-dark-300">Cart Name</p>
              <p className="h2-semibold text-primary-500">
                {result?.order.name}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="paragraph-regular text-dark-300">Payment Status</p>
              <p className="h2-semibold text-primary-500">
                {result?.order.paymentStatus}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="paragraph-regular text-dark-300">Invoice</p>
              <p className="h2-semibold text-primary-500">Details</p>
            </div>
            <div className="flex flex-col">
              <p className="paragraph-regular text-dark-300">Recipient</p>
              <p className="h2-semibold text-primary-500">
                {result?.order.address.name}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="paragraph-regular text-dark-300">Delivery Status</p>
              <p className="h2-semibold text-primary-500">
                {result.order.status}
              </p>
            </div>
          </div>
          <div className="flex gap-10 items-center">
            <div className="flex flex-col">
              <p className="paragraph-regular text-dark-300">Total Price</p>
              <div className="flex gap-2 items-center">
                <PhilippinePeso size={20} className="text-primary-500" />
                <p className="h2-semibold text-primary-500">1568</p>
              </div>
            </div>
            <Button className="px-6 rounded-3xl text-light-900 bg-primary-500">
              Send Payment
            </Button>
          </div>
        </div>
        <div>
          {result?.order.packages.length === 0 && (
            <p className="h2-semibold text-dark-300">Shipping Cart is Empty</p>
          )}
          {result?.order.packages.map((item: any) => (
            <div key={item._id}>
              <PackageItem
                vendorName={item.vendor}
                description={item.description}
                trackingNumber={item.trackingNumber}
                date={formatDate(item.createdAt)}
                status={item.status}
                packageId={JSON.stringify(item._id)}
              />
            </div>
          ))}
          <div className="flex flex-col gap-5 items-start mt-5">
            <Link href={`/user/packages/${id}/add`}>
              <Button className="px-6 border border-primary-500 text-primary-500  hover:bg-primary-500 hover:text-light-900">
                <PackagePlus />
                Add a Package
              </Button>
            </Link>
            <p className="body-regular text-primary-500">
              **Maximum consolidation period is <b>3 days</b> from the time of
              the first package for consolidation is received. All the items in
              the shipping cart will be shipped after the payment is made.
            </p>
          </div>
        </div>
      </div>

      <div className="h-full flex flex-col justify-end mt-10">
        {/* <p className="h2-semibold text-dark-300 mb-5">Order Details</p> */}
        <div className="flex flex-wrap gap-10">
          {/* <div className="flex flex-col">
            <p className="paragraph-regular text-dark-300">Order ID</p>
            <p className="h2-semibold text-primary-500">{result?.order._id}</p>
          </div> */}
          <div className="flex flex-col">
            <p className="paragraph-regular text-dark-300">Date Created</p>
            <p className="h2-semibold text-primary-500">
              {formatDate(result?.order.createdAt)}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="paragraph-regular text-dark-300">Contact Number</p>
            <p className="h2-semibold text-primary-500">
              {result?.order.address.contactNumber}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="paragraph-regular text-dark-300">Delivery Address</p>
            <p className="h2-semibold text-primary-500">
              {result?.order.address.addressLine1}{" "}
              {result?.order.address.addressLine2} {result?.order.address.city}{" "}
              {result?.order.address.province}{" "}
              {result?.order.address.postalCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
