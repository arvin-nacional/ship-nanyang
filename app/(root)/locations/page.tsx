import CTA from "@/components/CTA";
import FeaturesGrid from "@/components/FeaturesGrid";
// import Location from "@/components/Location";
import OfficeLocations from "@/components/OfficeLocations";
import RequestQuoteSection from "@/components/RequestQuoteSection";
import React from "react";


const page = () => {
  return (
    <div>
      <FeaturesGrid />
      <OfficeLocations />
      {/* <Location /> */}
      <RequestQuoteSection variant="default" />
    </div>
  );
};

export default page;
