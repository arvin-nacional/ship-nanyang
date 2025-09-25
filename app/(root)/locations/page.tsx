import CTA from "@/components/CTA";
import FeaturesGrid from "@/components/FeaturesGrid";
// import Location from "@/components/Location";
import RequestQuoteSection from "@/components/RequestQuoteSection";
import React from "react";


const page = () => {
  return (
    <div className="max-sm:pt-20">
      <FeaturesGrid />
      {/* <Location /> */}
      <RequestQuoteSection variant="default" />
    </div>
  );
};

export default page;
