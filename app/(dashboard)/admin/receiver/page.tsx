import React from "react";

import { getUserIdByClerkId } from "@/lib/actions/user.action";
import { getAddressByUserId } from "@/lib/actions/address.action";
import AddressItem from "@/components/ui/addressItem";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SquarePlus } from "lucide-react";

const page = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User ID is null");
  }
  const result = await getUserIdByClerkId({ clerkId: userId });
  const address = await getAddressByUserId(result.userId);

  return (
    <div className="p-12 w-full max-sm:p-6" style={{ minHeight: "90vh" }}>
      <div className="flex justify-between  h-12 items-center max-sm:flex-row-reverse">
        <p className="h2-semibold text-primary-500">Receivers</p>
        <Link href={`/admin/receiver/add`}>
          <Button className="px-6 rounded-3xl border border-primary-500 text-primary-500 hover:bg-primary-400 hover:text-light-900">
            {" "}
            <SquarePlus size={24} /> Add Receiver
          </Button>
        </Link>
      </div>

      <div>
        {address?.addresses?.map((item) => (
          <div key={item._id}>
            {" "}
            <AddressItem
              name={item.name}
              addressLine1={item.addressLine1}
              addressLine2={item.addressLine2}
              city={item.city}
              province={item.province}
              contactNumber={item.contactNumber}
              postalCode={item.postalCode}
              addressId={item._id}
              isDefault={item.isDefault}
              admin={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
