import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const About = () => {
  return (
    <>
      <section className="flex items-center justify-center bg-gray-100 px-16 pt-20 max-md:px-5 max-sm:pt-5 max-sm:pb-0 sm:px-14">
        <div className="grid w-[1200px] max-w-full grid-cols-2 gap-10 px-2 pb-6 align-top max-md:mt-10 max-sm:grid-cols-1">
          <div className="flex flex-col items-start justify-center">
            <h2 className="h1-bold mb-2 text-dark-500">
              Order with ease and let us handle the journey. Fast, reliable, and
              secure logistics tailored to{" "}
              <span className="text-primary-500">bring your products home</span>
              .
            </h2>
            <p className="paragraph-regular mt-5 ">
              We make global shopping effortless for customers in the
              Philippines by bringing products from China right to your
              doorstep. With our trusted and convenient logistics service, you
              can enjoy access to China’s vast marketplace and have peace of
              mind knowing your orders will be delivered securely to your home.
              Whether it’s hard-to-find items or unique products, we’re here to
              simplify the entire process, so you can focus on what
              matters—enjoying your purchases.
            </p>
            <Link href="https://m.me/sdexpressinternational">
              <Button className="mt-10 rounded-3xl bg-primary-500 px-10 text-light-900">
                Start Now
              </Button>
            </Link>
          </div>
          <Image
            alt="about-image"
            src="/assets/images/about-1.png"
            width={552}
            height={552}
          />
        </div>
      </section>
      {/* <div id="solutions"></div> */}
    </>
  );
};

export default About;
