import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
    <div className="p-12 w-full" style={{ minHeight: "90vh" }}>
      <div className="flex justify-between">
        <Breadcrumb className="mb-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/user/profile/">Profile</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>My Address</BreadcrumbPage>
            </BreadcrumbItem>
            {/* <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/user/address/add`}>Add</BreadcrumbLink>
          </BreadcrumbItem> */}
          </BreadcrumbList>
        </Breadcrumb>
        <Link href={`/user/address/add`}>
          <Button className="px-6 rounded-3xl border border-primary-500 text-primary-500">
            {" "}
            <SquarePlus size={24} /> Add Address
          </Button>
        </Link>
      </div>

      <div>
        {address?.addresses.map((item) => (
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
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
