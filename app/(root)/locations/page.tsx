import CTA from "@/components/CTA";
import FeaturesGrid from "@/components/FeaturesGrid";
import Location from "@/components/Location";
import React from "react";


const page = () => {
  return (
    <div className="max-sm:pt-20">
      <FeaturesGrid />
      {/* <Location /> */}
      <CTA />
    </div>
  );
};

export default page;
