import About from "@/components/About";
import CTA from "@/components/CTA";
// import Hero from "@/components/Hero";
import NewHero from "@/components/NewHero";
import PartnerLogos from "@/components/PartnerLogos";
import { Services } from "@/components/Services";
import ShipmentProcess from "@/components/ShipmentProcess";
import Solutions from "@/components/Solutions";
import Testimonials from "@/components/Testimonials";
import React from "react";
import Globe from "@/components/Globe";
const Page = () => {
  return (
    <section className="background-light850_dark100">
      <NewHero />
      <PartnerLogos />
      <Services />
      {/* <About /> */}
      {/* <Solutions /> */}
      <Globe />
      <ShipmentProcess />
      <Testimonials />
      <CTA />
    </section>
  );
};

export default Page;
