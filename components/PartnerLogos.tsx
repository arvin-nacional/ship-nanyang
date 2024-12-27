import Image from "next/image";
import React from "react";

const PartnerLogos = () => {
  return (
    <section className="flex items-center justify-center px-16 py-16  max-md:px-5 max-sm:py-16 sm:px-14 bg-light-900">
      <div className=" flex w-[1200px] max-w-full gap-10  align-top  flex-col justify-center items-center">
        <p className="h1-bold text-dark-400">Our Courier Partners</p>
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
