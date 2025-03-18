import React from "react";

import OrderForUser from "@/components/forms/OrderForUser";
import { auth } from "@clerk/nextjs/server";
import { getAddressByUserId } from "@/lib/actions/address.action";
import { getUserById, getUserIdByClerkId } from "@/lib/actions/user.action";
import { getOrdersByUserId } from "@/lib/actions/order.action";
import { SearchParamsProps } from "@/types";

type PageProps = {
  params: Promise<{ id: string }>;
};
const page = async ({ params }: PageProps) => {
  const { id } = await params;
  console.log(id);

  if (!id) {
    throw new Error("User ID is null");
  }
  const user = await getUserById({ userId: id });

  console.log(user);

  const address = await getAddressByUserId(id);
  const orders = await getOrdersByUserId({ clerkId: user.user.clerkId });
  return (
    <div className="p-12 w-full max-sm:p-6" style={{ minHeight: "90vh" }}>
      <p className="h2-bold mb-5">Add a Package</p>
      <OrderForUser
        address={JSON.stringify(address)}
        orders={JSON.stringify(orders)}
        admin={true}
        user={JSON.stringify(user.user)}
      />
    </div>
  );
};

export default page;
