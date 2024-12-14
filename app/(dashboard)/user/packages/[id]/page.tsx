import { Button } from "@/components/ui/button";
import PackageItem from "@/components/ui/packageItem";
import { getOrderById } from "@/lib/actions/order.action";
import { formatDate } from "@/lib/utils";
import { PhilippinePeso } from "lucide-react";
import React from "react";
type tParams = Promise<{ id: string }>;
const page = async ({ params }: { params: tParams }) => {
  const { id } = await params;

  const result = await getOrderById(id);
  console.log(result);
  return (
    <div className="w-full h-[90vh] p-12">
      <p className="h2-semibold text-dark-300 mb-5">Package Details</p>
      <div className="flex justify-between  mb-10 items-end">
        <div className="flex flex-wrap gap-10">
          <div className="flex flex-col">
            <p className="paragraph-regular text-dark-300">Package Name</p>
            <p className="h2-semibold text-primary-500">{result?.order.name}</p>
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

      {result?.order.packages.map((item: any) => (
        <div key={item._id}>
          <PackageItem
            vendorName={item.vendor}
            description={item.description}
            trackingNumber={item.trackingNumber}
            date={formatDate(item.createdAt)}
            status={item.status}
          />
        </div>
      ))}
    </div>
  );
};

export default page;
