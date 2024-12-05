import ShippingCalculatorForm from "@/components/forms/ShippingCalculatorForm";
import React from "react";

const page = () => {
  return (
    <div className="w-full py-12">
      <div className="w-full flex justify-center items-center ">
        <div className="w-3/4 max-sm:w-full">
          <ShippingCalculatorForm />
        </div>
      </div>
    </div>
  );
};

export default page;
