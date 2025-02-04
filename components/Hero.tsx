import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import GridLoader from "react-spinners/GridLoader";

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const videoElement = document.getElementById(
      "hero-video"
    ) as HTMLVideoElement;
    if (videoElement) {
      videoElement.onloadeddata = () => {
        setIsVideoLoaded(true);
      };
    }
  }, []);

  return (
    <section className="relative flex h-screen w-full items-center justify-center px-16 py-10 pb-14 max-md:px-10 max-md:py-20">
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="flex justify-center items-center ">
            <GridLoader color="#BD1826" size={15} />
          </div>
        </div>
      )}
      <video
        id="hero-video"
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover ${isVideoLoaded ? "block" : "hidden"}`}
      >
        <source src="/assets/videos/delivery3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {isVideoLoaded && (
        <div className="relative z-10 w-[1200px] max-w-full justify-between py-20 pb-6 max-md:mt-1 max-sm:py-2">
          <h1 className="h1-semihero mb-10 text-light-900 drop-shadow-lg">
            Effortless Shipping <br /> from China to Your Doorstep
          </h1>
          <h2 className="h3-semibold w-1/2 text-light-900 max-sm:w-full">
            Order with ease and let us handle the journey. Fast, reliable, and
            secure logistics tailored to bring your products home.
          </h2>
          <div className="mt-10 flex gap-2">
            <Link href="https://m.me/sdexpressinternational">
              <Button className="rounded-3xl">Contact Us</Button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
