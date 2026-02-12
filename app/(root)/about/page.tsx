import AboutPage from "@/components/AboutPage";
import CompanyOverview from "@/components/CompanyOverview";
import CTA from "@/components/CTA";
import Employees from "@/components/Employees";
import RequestQuoteSection from "@/components/RequestQuoteSection";
import ShipmentProcess from "@/components/ShipmentProcess";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";
import React from "react";

const page = () => {
  return (
    <div>
      <CompanyOverview />
      <AboutPage />
      {/* <WhyUs /> */}
      <Employees />
      <ShipmentProcess />
      <Testimonials />
      <RequestQuoteSection variant="default" />
    </div>
  );
};

export default page;
