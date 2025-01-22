import ShippingCalculatorForm from "@/components/forms/ShippingCalculatorForm";
import React from "react";

const page = () => {
  return (
    <div className="w-full p-12 max-sm:p-6">
      <div className="w-full flex justify-center items-center ">
        <div className=" w-full max-sm:w-full">
          <ShippingCalculatorForm />
        </div>
      </div>
    </div>
  );
};

export default page;
