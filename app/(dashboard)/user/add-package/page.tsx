import React from "react";

import Order from "@/components/forms/Order";

const page = () => {
  return (
    <div className="p-12 w-full" style={{ minHeight: "90vh" }}>
      <p className="h2-bold mb-5">Add a Package</p>
      <Order />
    </div>
  );
};

export default page;
