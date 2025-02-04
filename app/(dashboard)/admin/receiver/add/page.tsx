import Address from "@/components/forms/Address";
import React from "react";

const page = async () => {
  return (
    <div className="p-12 w-full" style={{ minHeight: "90vh" }}>
      <Address type="create" admin={true} />
    </div>
  );
};

export default page;
