import About from "@/components/About";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import ShipmentProcess from "@/components/ShipmentProcess";
import Solutions from "@/components/Solutions";
import Testimonials from "@/components/Testimonials";
import React from "react";

const Page = () => {
  return (
    <section className="background-light850_dark100">
      <Hero />
      <About />
      <Solutions />
      <ShipmentProcess />
      <Testimonials />
      <CTA />
    </section>
  );
};

export default Page;
