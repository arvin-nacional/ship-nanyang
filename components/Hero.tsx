import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative flex h-screen w-full items-center justify-center px-16 py-10 pb-14 max-md:px-10 max-md:py-20">
      <Image
        src="/assets/images/hero-bg-new3.png"
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />
      <div className="relative z-10 w-[1200px] max-w-full justify-between py-20 pb-6 max-md:mt-1 max-sm:py-2">
        <h1 className="h1-semihero mb-10 text-light-900 drop-shadow-lg max-sm:h2-title">
          Empowering Local Businesses <br /> with Reliable Shipping Solutions{" "}
          <br />
          for Seamless Operations.
        </h1>
        <h2 className="h3-semibold w-1/2 text-light-900 max-sm:w-full drop-shadow-2xl">
          Order with ease and let us handle the journey. Fast, reliable, and
          secure logistics tailored to bring your products home.
        </h2>
        <div className="mt-10 flex gap-2">
          <Link href="https://m.me/sdexpressinternational">
            <Button className="rounded-3xl bg-light-800 text-primary-500 px-10">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
