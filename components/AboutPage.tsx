import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const AboutPage = () => {
  return (
    <section className="flex items-center justify-center bg-gray-100 px-16 pt-32 pb-20 max-md:px-5 max-sm:py-5 sm:px-14">
      <div className="grid w-[1200px] max-w-full grid-cols-2 gap-10 px-2 pb-6 align-top max-md:mt-10 max-sm:grid-cols-1">
        <div className="flex flex-col items-start justify-center">
          <h2 className="h1-bold mb-2 text-dark-500">
            At SD Express, we bridge the gap between the vast marketplace of
            <span className="text-primary-500"> China</span> and your
            <span className="text-primary-500"> home in the Philippines</span>.
          </h2>
          <p className="paragraph-regular mt-5 ">
            Our mission is to simplify international shopping, making it
            accessible, affordable, and hassle-free for everyone. We understand
            the challenges of buying products from overseas—complicated shipping
            processes, hidden fees, and the uncertainty of when your items will
            arrive. That&apos;s why we&apos;ve created a streamlined service to
            take the stress out of international logistics. From providing you
            with a unique shipping address in China to delivering your purchases
            straight to your doorstep, we handle every step with care and
            precision.
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
  );
};

export default AboutPage;
