import React from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
const Employees = () => {
  const testimonials = [
    {
      quote:
        "Daniel ensures smooth coordination between sales and shipping operations. They oversee order processing, manage logistics strategies, and guarantee timely deliveries, all while optimizing costs and ensuring customer satisfaction. With a focus on efficiency and reliability, he helps drive our commitment to seamless shipping solutions.",
      name: "Daniel Loke",
      designation: "Sales Logistic Manager",
      src: "/assets/images/daniel-3.png",
    },
    {
      quote:
        "Arvin leads the development and maintenance of our technology systems, ensuring everything runs smoothly and securely. They oversee infrastructure, manage system upgrades, and implement innovative solutions to support business growth. With a focus on efficiency and innovation, he helps keep our operations connected and future-ready.",
      name: "Arvin Nacional",
      designation: "IT Manager",
      src: "/assets/images/arvin-2.png",
    },
  ];
  return (
    <main className="flex flex-col items-center justify-center overflow-hidden py-14 max-md:py-0 max-md:pt-14">
      <section className="w-[1200px] max-w-full overflow-hidden max-sm:rounded-none rounded-3xl bg-gray-100 shadow-lg">
        {/* <p className="h1-bold mb-5">Our Team</p> */}
        <AnimatedTestimonials testimonials={testimonials} />
      </section>{" "}
    </main>
  );
};

export default Employees;
