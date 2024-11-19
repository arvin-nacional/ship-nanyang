import React from "react";
import Image from "next/image";
import SolutionsCard from "./ui/solutions-card";
import { solutions } from "@/constants";

const Solutions = () => {
  return (
    <section
      className="flex items-center justify-center bg-gray-100 px-16 py-20 max-md:px-5 max-sm:py-5 sm:px-14"
      id="solutions"
    >
      <div className=" flex w-[1200px] max-w-full flex-row gap-10 px-2 pb-6 align-top max-md:mt-10 max-sm:flex-col-reverse">
        <Image
          alt="about-image"
          src="/assets/images/about-2.png"
          width={552}
          height={552}
          className="max-sm:order-2"
        />
        <div className="flex flex-col items-start justify-center max-sm:order-2">
          <h2 className="h1-bold mb-10 text-dark-500">Solutions We Provide</h2>
          <div className="flex flex-col gap-8">
            {solutions.map((item) => (
              <SolutionsCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
