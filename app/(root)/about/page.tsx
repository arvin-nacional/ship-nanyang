import AboutPage from "@/components/AboutPage";
import CTA from "@/components/CTA";
import Employees from "@/components/Employees";
import ShipmentProcess from "@/components/ShipmentProcess";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";
import React from "react";

const page = () => {
  return (
    <div className="max-sm:pt-20">
      <AboutPage />
      {/* <WhyUs /> */}
      <Employees />
      <ShipmentProcess />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default page;
