import AboutPage from "@/components/AboutPage";
import CTA from "@/components/CTA";
import ShipmentProcess from "@/components/ShipmentProcess";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";
import React from "react";

const page = () => {
  return (
    <div>
      <AboutPage />
      <WhyUs />
      <ShipmentProcess />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default page;
