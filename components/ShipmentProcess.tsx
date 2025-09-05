import React from "react";
import ProcessCard from "./ui/processCard";
import { process } from "@/constants";

const ShipmentProcess = () => {
  return (
    <section className="flex items-center justify-center bg-gray-100 px-16 py-20 max-md:px-5 max-sm:py-5 sm:px-14 ">
      <div className="grid w-[1200px] max-w-full  gap-10 px-2 pb-6 align-top max-md:mt-10 ">
        <p className="h1-bold text-center w-full">Our Shipment Process</p>
        {/* <p className="paragraph-regular text-dark-400">
          Welcome to hassle-free international shopping! With our logistics
          service, ordering from China and receiving your items in the
          Philippines has never been easier. Simply sign up, shop from any
          China-based store, and use your unique shipping address. We handle the
          journey from our warehouse in China right to your doorstep—providing a
          seamless, reliable, and affordable delivery experience every time.
        </p> */}

        <div className="mt-5 flex items-start justify-between max-md:flex-col md:flex-wrap gap-3">
          {process.map((item) => (
            <ProcessCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShipmentProcess;
