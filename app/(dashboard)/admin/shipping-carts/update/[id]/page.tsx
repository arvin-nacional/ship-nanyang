import Cart from "@/components/forms/Cart";
import { getOrderById } from "@/lib/actions/order.action";
import React from "react";
type tParams = Promise<{ id: string }>;
const page = async ({ params }: { params: tParams }) => {
  const { id } = await params;

  const result = await getOrderById(id);
  console.log(result.order);
  return (
    <div className="w-full min-h-[90vh] p-12">
      <p className="h2-semibold text-primary-500 mb-5">Update Shipping Cart</p>
      <Cart shippingDetails={JSON.stringify(result.order)} />
    </div>
  );
};

export default page;
