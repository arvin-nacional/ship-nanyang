import React from "react";

import Order from "@/components/forms/Order";
import { auth } from "@clerk/nextjs/server";
import { getAddressByUserId } from "@/lib/actions/address.action";
import { getUserIdByClerkId } from "@/lib/actions/user.action";
import { getOrdersByUserId } from "@/lib/actions/order.action";

const page = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User ID is null");
  }
  const user = await getUserIdByClerkId({ clerkId: userId });

  const address = await getAddressByUserId(user.userId);
  const orders = await getOrdersByUserId(user.userId);
  console.log(orders);
  return (
    <div className="p-12 w-full" style={{ minHeight: "90vh" }}>
      <p className="h2-bold mb-5">Add a Package</p>
      <Order
        address={JSON.stringify(address)}
        orders={JSON.stringify(orders)}
      />
    </div>
  );
};

export default page;
