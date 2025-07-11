import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <section className="background-light850_dark100 flex items-center justify-center bg-dark-300 px-16 py-10 max-md:px-5">
      <div className="mt-14 flex w-[1200px] flex-row  justify-between max-sm:mt-5 max-sm:flex-col">
        <div className="flex flex-col gap-5 pb-12">
          <Image
            src="/assets/icons/logo-primary.png"
            width={150}
            height={40}
            alt="logo"
          />
          <p className="w-[350px] text-slate-300">
            Forget the hassle of international shipping—order from China with
            ease, and we&apos;ll handle the rest, delivering directly to your
            home.
          </p>
          <div className="flex gap-5">
            <a
              href="https://www.facebook.com/sdexpressinternational"
              target="_blank"
            >
              <Image
                src="/assets/icons/facebook_blue.svg"
                width={20}
                height={20}
                alt="logo"
                className="bg-[#1877F2] rounded-full"
              />
            </a>
            {/* <a
              href="https://www.facebook.com/sdexpressinternational"
              target="_blank"
            >
              <Image
                src="/assets/icons/instagram.svg"
                width={20}
                height={20}
                alt="logo"
                // className="invert-colors"
              />
            </a>
            <a
              href="https://www.facebook.com/sdexpressinternational"
              target="_blank"
            >
              <Image
                src="/assets/icons/linkedin.svg"
                width={20}
                height={20}
                alt="logo"
                // className="invert-colors"
              />
            </a> */}
          </div>
        </div>
        <div className="text-dark400_light800 pb-12">
          <p className="h3-bold text-white">Quick Links</p>
          <div className="body-regular mt-2 flex flex-col gap-2 text-slate-300">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/shipping-calculator">Shipping Calculator</Link>
            <Link href="/locations">Location</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
        <div className="text-dark400_light800 pb-12 ">
          <p className="h3-bold text-white">Contact</p>
          <div className="body-regular text-slate-300">
            <div className=" mt-3 flex gap-5 ">
              <Image
                src="/assets/icons/telephone-call.png"
                width={20}
                height={20}
                alt="logo"
              />
              <p>+63 966 401 6784</p>
            </div>
            <div className="mt-3 flex gap-5 ">
              <Image
                src="/assets/icons/paper-plane.png"
                width={20}
                height={20}
                alt="logo"
              />
              <p>inquiries@sdexpress.ph</p>
            </div>
            <div className="mt-3 flex gap-5 items-start">
              <Image
                src="/assets/icons/pin.png"
                sizes="20"
                alt="locatin pin"
                width={20}
                height={20}
                objectFit="cover"
              />
              <p className="text-wrap">
                26th and 27th Floors The Podium, <br />
                Lower, Ortigas Center, Mandaluyong, <br />
                1605 Metro Manila, Philippines
              </p>
            </div>
          </div>
        </div>

        {/* <div className="pb-12">
          <p className="h3-bold text-white">Subscribe</p>
          <p className="small-regular mb-3 py-2 text-slate-300">
            Subscribe to get our latest news and updates.
          </p>
          <Subscriber type="" />
        </div> */}
      </div>
    </section>
  );
};

export default Footer;
