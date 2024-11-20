import CTA from "@/components/CTA";
import ShippingCalculatorForm from "@/components/forms/ShippingCalculatorForm";
import Testimonials from "@/components/Testimonials";
import React from "react";

const page = () => {
  return (
    <>
      <section className="background-light400_dark300 flex items-center justify-center overflow-hidden px-16 pb-20 pt-0 max-md:p-10">
        <div className="w-[1200px] max-w-full justify-center pb-6 max-md:mt-10 lg:mt-20 ">
          <h6 className="h1-bold mt-5 mb-10 text-center">
            Shipping Calculator
          </h6>
          <div className="w-full flex justify-center items-center ">
            <div className="w-3/4 max-sm:w-full">
              <ShippingCalculatorForm />
            </div>
          </div>

          <div className="mt-20">
            <h6 className="h2-semibold">Standard Shipping Rates</h6>
            <p className="paragraph-regular">
              We offer reliable and affordable shipping from China to the
              Philippines. Deliveries are handled by trusted carriers, ensuring
              your items arrive safely and on time. Flights operate from Monday
              to Friday.
            </p>
          </div>
        </div>
      </section>
      <Testimonials />
      <CTA />
    </>
  );
};

export default page;
