import Order from "@/components/forms/Order";
import { getOrderById } from "@/lib/actions/order.action";
import React from "react";

type tParams = Promise<{ id: string }>;
const page = async ({ params }: { params: tParams }) => {
  const { id } = await params;

  const result = await getOrderById(id);
  const orderAddressId = result?.order.address._id;

  return (
    <div className="p-12 w-full" style={{ minHeight: "90vh" }}>
      <p className="h2-bold mb-5">Add a Package</p>
      <Order
        type="consolidation"
        addressId={JSON.stringify(orderAddressId)}
        orderId={id}
      />
    </div>
  );
};

export default page;
