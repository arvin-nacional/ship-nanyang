/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import PackageItem from "@/components/ui/packageItem";
import PaymentImages from "@/components/ui/PaymentImages";
import { getOrderById } from "@/lib/actions/order.action";
import {
  capitalizeWords,
  formatDate,
  getTotalFinalAmount,
  getTotalPrice,
} from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { PackagePlus, PhilippinePeso } from "lucide-react";
import Link from "next/link";
import React from "react";
type tParams = Promise<{ id: string }>;
const page = async ({ params }: { params: tParams }) => {
  const { id } = await params;

  const { sessionClaims } = await auth();

  const userType = (sessionClaims?.userType as string) || "user";
  const result = await getOrderById(id);

  const totalFinalAmount = getTotalFinalAmount(result.order.packages);

  const totalPrice = getTotalPrice(
    totalFinalAmount,
    result?.order.insurance,
    result?.order.miscellaneousFee,
    result?.order.localDeliveryFee,
    result?.order.discount
  );

  return (
    <div className="w-full min-h-[90vh] p-12 flex flex-col items-between max-sm:p-6">
      <div className="h-full">
        <p className="h2-semibold text-dark-300 mb-5">Shipping Cart Details</p>
        <div className="flex justify-between  mb-10 items-end max-sm:flex-col max-sm:items-start">
          <div className="flex flex-wrap gap-10 max-sm:flex-col max-sm:gap-2">
            <div className="flex flex-col">
              <p className="paragraph-regular text-dark-300">Cart Name</p>
              <p className="h2-semibold text-primary-500">
                {result?.order.name}
              </p>
            </div>

            {/* <div className="flex flex-col">
              <p className="paragraph-regular text-dark-300">Invoice</p>
              <p className="h2-semibold text-primary-500">Details</p>
            </div> */}
            <div className="flex flex-col">
              <p className="paragraph-regular text-dark-300">Recipient</p>
              <p className="h2-semibold text-primary-500">
                {result?.order.address.name}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="paragraph-regular text-dark-300">Status</p>
              <p className="h2-semibold text-primary-500">
                {capitalizeWords(result.order.status)}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="paragraph-regular text-dark-300">Payment Status</p>
              <p className="h2-semibold text-primary-500">
                {capitalizeWords(result?.order.paymentStatus)}
              </p>
            </div>
          </div>
          <div className="flex gap-10 items-center">
            <div className="flex flex-col">
              <p className="paragraph-regular text-dark-300">Total Price</p>
              <div className="flex gap-2 items-center">
                <PhilippinePeso size={20} className="text-primary-500" />
                <p className="h2-semibold text-primary-500">{totalPrice}</p>
              </div>
            </div>
            <Link href={"/admin/shipping-carts/update/" + id}>
              <Button className="px-6 rounded-3xl text-light-900 bg-primary-500">
                Update Cart
              </Button>
            </Link>
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
                value={item.value}
                userType={userType}
                finalAmount={item.finalAmount?.toString()}
              />
            </div>
          ))}
          <div className="flex flex-col gap-5 items-start mt-5">
            <Link href={`/admin/shipping-carts/${id}/add`}>
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

      <div className="h-full flex mt-10 max-sm:flex-col-reverse">
        {/* <p className="h2-semibold text-dark-300 mb-5">Order Details</p> */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <p className="paragraph-regular text-dark-300">Date Created</p>
            <p className="base-bold text-primary-500">
              {formatDate(result?.order.createdAt)}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="paragraph-regular text-dark-300">Contact Number</p>
            <p className="base-bold text-primary-500">
              {result?.order.address.contactNumber}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="paragraph-regular text-dark-300">Delivery Address</p>
            <p className="base-bold text-primary-500">
              {result?.order.address.addressLine1}{" "}
              {result?.order.address.addressLine2} {result?.order.address.city}{" "}
              {result?.order.address.province}{" "}
              {result?.order.address.postalCode}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-end mb-5">
          <div className="w-[400px] flex flex-col ">
            <div className="w-full border-b-2 border-red-500 flex justify-between p-1 items-center">
              <p className="body-regular text-primary-500">
                Total Shipment Price
              </p>
              <div className="flex gap-2 items-center w-[80px]">
                <PhilippinePeso size={16} className="text-dark-400" />
                <p className="paragraph-regular text-dark-400">
                  {totalFinalAmount}
                </p>
              </div>
            </div>
            <div className="w-full border-b-2 border-red-500 flex justify-between p-1 items-center ">
              <p className="body-regular text-primary-500">Insurance</p>
              <div className="flex gap-2 items-center w-[80px]">
                <PhilippinePeso size={16} className="text-dark-400" />
                <p className="paragraph-regular text-dark-400">
                  {result?.order.insurance}
                </p>
              </div>
            </div>
            <div className="w-full border-b-2 border-red-500 flex justify-between p-1 items-center">
              <p className="body-regular text-primary-500">
                Miscellaneous fees
              </p>
              <div className="flex gap-2 items-center w-[80px]">
                <PhilippinePeso size={16} className="text-dark-4000" />
                <p className="paragraph-regular text-dark-400">
                  {result?.order.miscellaneousFee}
                </p>
              </div>
            </div>

            <div className="w-full border-b-2 border-red-500 flex justify-between p-1 items-center">
              <p className="body-regular text-primary-500">
                Local Delivery Fees
              </p>
              <div className="flex gap-2 items-center w-[80px]">
                <PhilippinePeso size={16} className="text-dark-400" />
                <p className="paragraph-regular text-dark-400">
                  {result?.order.localDeliveryFee}
                </p>
              </div>
            </div>
            <div className="w-full border-b-2 border-red-500 flex justify-between p-1 items-center">
              <p className="body-regular text-primary-500">Discount</p>
              <div className="flex gap-2 items-center w-[80px]">
                <PhilippinePeso size={16} className="text-dark-400" />
                <p className="paragraph-regular text-dark-400">
                  {result?.order.discount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="h2-semibold text-dark-400 my-10">Payment Images</p>
        <PaymentImages images={JSON.stringify(result?.order.paymentImages)} />
      </div>
    </div>
  );
};

export default page;
