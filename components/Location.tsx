import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Location = () => {
  return (
    <>
      <section className="flex items-center justify-center bg-gray-100 px-16 pt-32 pb-20 max-md:px-5 max-sm:py-5 sm:px-14">
        <div className="grid w-[1200px] max-w-full grid-cols-2 gap-10 px-2 pb-6 align-top max-md:mt-10 max-sm:grid-cols-1">
          <div className="flex flex-col items-start justify-center">
            <p className="h1-bold text-dark-300 mb-10">Branch Offices</p>
            <h2 className="h2-bold mb-2 text-dark-500">Ortigas, Manila</h2>
            <p className="paragraph-regular mt-5 mb-10 text-dark-400 ml-5">
              26th and 27th Floors The Podium, Lower, Ortigas Center,
              Mandaluyong, 1605 Metro Manila, Philippines
            </p>
            <h2 className="h2-bold mb-2 text-dark-500">Davao City</h2>
            <p className="paragraph-regular mt-5 text-dark-400 ml-5">
              Branch coming out soon. Stay tuned for more updates.
            </p>
            <Link href="https://m.me/sdexpressinternational">
              <Button className="mt-10 rounded-3xl bg-primary-500 px-10 text-light-900">
                Inquire Now
              </Button>
            </Link>
          </div>
          <Image
            alt="about-image"
            src="/assets/images/location.png"
            width={552}
            height={552}
          />
        </div>
      </section>
      {/* <div id="solutions"></div> */}
    </>
  );
};

export default Location;
