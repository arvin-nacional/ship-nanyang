import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const CTA = () => {
  return (
    <main className="flex flex-col items-center justify-center overflow-hidden py-14 max-md:py-0 max-md:pt-14">
      <section className="w-[1200px] max-w-full overflow-hidden max-sm:rounded-none rounded-3xl bg-white shadow-lg">
        <div className="flex gap-5 rounded-xl max-md:flex-col ">
          <article className="flex w-[41%] flex-col max-md:ml-0 max-md:w-full ">
            <div className="flex w-full flex-col items-start justify-center gap-5 max-md:mt-10 max-md:max-w-full h-full max-sm:ml-5 ml-20">
              <h4 className="base-medium">Ready to ship from China?</h4>
              <h5 className="h1-bold drop-shadow-lg">Send Us a Message Now</h5>
              <Link href="https://m.me/sdexpressinternational">
                <Button className="rounded-3xl bg-primary-500 px-10 text-light-900">
                  Contact Us
                </Button>
              </Link>
            </div>
          </article>
          <figure className="flex w-[59%] max-sm:w-[100%] flex-col max-md:ml-0 max-md:w-full">
            <Image
              loading="lazy"
              src="/assets/images/cta-img.png"
              alt="Shipping from China illustration"
              className="aspect-[2.2] max-sm:aspect-[1.5] w-full grow object-fill max-md:mt-5 max-md:max-w-full max-md:object-cover"
              height={300}
              width={754}
            />
          </figure>
        </div>
      </section>
    </main>
  );
};

export default CTA;
