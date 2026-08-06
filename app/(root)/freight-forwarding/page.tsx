import React from "react";
import FreightHero from "@/components/landing/FreightHero";
import ShippingRoutes from "@/components/landing/ShippingRoutes";
import ShippingRates from "@/components/landing/ShippingRates";
import HowItWorks from "@/components/landing/HowItWorks";
import DeliveryOptions from "@/components/landing/DeliveryOptions";
import CommerceFeatures from "@/components/landing/CommerceFeatures";
import MerchantTestimonials from "@/components/landing/MerchantTestimonials";
import FreightCTA from "@/components/landing/FreightCTA";

export const metadata = {
  title: "Freight Forwarding from China to the Philippines | ShipNanyang",
  description:
    "Air and sea freight forwarding from China to the Philippines. Door-to-door delivery, customs clearance, and instant shipping cost estimates.",
};

const page = () => {
  return (
    <div className="background-light850_dark100">
      <FreightHero />
      <ShippingRoutes />
      <ShippingRates />
      <HowItWorks />
      <DeliveryOptions />
      <CommerceFeatures />
      <MerchantTestimonials />
      <FreightCTA />
    </div>
  );
};

export default page;
