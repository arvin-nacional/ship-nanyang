import Package from "@/components/forms/Package";
import { getPackageById } from "@/lib/actions/package.action";
import React from "react";

type tParams = Promise<{ id: string }>;

const page = async ({ params }: { params: tParams }) => {
  const { id } = await params;
  const result = await getPackageById(id);
  console.log(result);
  return (
    <div className="p-12 w-full">
      <p className="h2-semibold text-primary-500 mb-5">Update Shipment</p>
      <Package packageDetails={JSON.stringify(result)} />
    </div>
  );
};

export default page;
