import Image from "next/image";
import React from "react";

const PartnerLogos = () => {
  return (
    <section className="flex items-center justify-center px-16 pt-16  max-md:px-8 max-sm:pt-16 sm:px-14 bg-light-900">
      <div className=" flex w-[1200px] max-w-full  align-top  flex-col justify-center">
        <p className="h1-bold text-dark-400 mb-5">Our Courier Partners</p>
        <p className="body-regular text-dark-400 mb-12">
          At SD Express, we are proud to collaborate with globally renowned
          courier partners such as DHL, UPS, Aramex, and FedEx. These industry
          leaders share our commitment to providing reliable, efficient, and
          secure delivery services. With their extensive networks and trusted
          expertise, we ensure that your packages reach their destinations
          swiftly and safely, whether across the country or around the world.
          Together, we empower businesses and connect communities through
          exceptional logistics solutions.
        </p>
        <div className="flex flex-row gap-5 justify-evenly items-center w-full flex-wrap">
          <Image
            src="/assets/images/dhl.png"
            height={44}
            width={310}
            alt="dhl logo"
            className="hover:scale-105 transition-all duration-300 ease-in-out "
          />
          <Image
            src="/assets/images/ups.png"
            height={80}
            width={70}
            alt="dhl logo"
            className="hover:scale-105 transition-all duration-300 ease-in-out "
          />
          <Image
            src="/assets/images/aramex.png"
            height={52}
            width={314}
            alt="dhl logo"
            className="hover:scale-105 transition-all duration-300 ease-in-out "
          />
          <Image
            src="/assets/images/fedex.png"
            height={58}
            width={210}
            alt="dhl logo"
            className="hover:scale-105 transition-all duration-300 ease-in-out "
          />
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
