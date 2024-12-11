import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  getUserByClerkId,
  getUserIdByClerkId,
} from "@/lib/actions/user.action";
import { getAddressByUserId } from "@/lib/actions/address.action";
import AddressItem from "@/components/ui/addressItem";
type tParams = Promise<{ id: string }>;
const page = async ({ params }: { params: tParams }) => {
  const { id } = await params;

  const result = await getUserIdByClerkId({ clerkId: id });
  console.log(result);

  const address = await getAddressByUserId(result.userId);
  console.log(address);

  return (
    <div className="p-12 w-full" style={{ minHeight: "90vh" }}>
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/user/profile/${id}`}>
              Profile
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>My Address</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/user/address/add`}>Add</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
