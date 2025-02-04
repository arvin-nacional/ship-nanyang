import Address from "@/components/forms/Address";
import React from "react";

import { getAddressById } from "@/lib/actions/address.action";
type tParams = Promise<{ id: string }>;
const page = async ({ params }: { params: tParams }) => {
  const { id } = await params;
  const result = await getAddressById(id);

  return (
    <div className="p-12 w-full" style={{ minHeight: "90vh" }}>
      <Address
        type="edit"
        addressDetails={JSON.stringify(result.address)}
        addressId={id}
        admin={true}
      />
    </div>
  );
};

export default page;
