import Address from "@/components/forms/Address";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getAddressById } from "@/lib/actions/address.action";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
type tParams = Promise<{ id: string }>;
const page = async ({ params }: { params: tParams }) => {
  const { id } = await params;

  const result = await getAddressById(id);
  console.log(result);

  return (
    <div className="p-12 w-full" style={{ minHeight: "90vh" }}>
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Profile</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/user/address/${id}`}>
              My Address
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Add</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Address
        type="edit"
        addressDetails={JSON.stringify(result.address)}
        addressId={id}
      />
    </div>
  );
};

export default page;
