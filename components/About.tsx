import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

const About = () => {
  return (
    <>
      <section className="flex items-center justify-center px-16 pb-20 max-md:px-5 max-sm:pt-5 max-sm:pb-0 sm:px-14">
        <div className="w-[1200px] max-w-full gap-10 px-2 pb-6 align-top max-md:mt-10 ">
        

          {/* <div className="flex items-center justify-center"> */}

          <div className="w-[850px] h-full overflow-hidden rounded-lg max-sm:h-64 mx-auto">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/assets/videos/delivery5.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* <Image
              alt="about-gif"
              src="/assets/images/delivery.gif"
              layout="fill"
              objectFit="cover"
              className="object-cover"
            /> */}
          </div>
          {/* <Image
            alt="about-gif"
            src="/assets/images/delivery.gif"
            width={552}
            height={552}
            className="object-cover"
          /> */}
          {/* </div> */}
          {/* <Image
            alt="about-image"
            src="/assets/images/about-1.png"
            width={552}
            height={552}
          /> */}
        </div>
      </section>
      {/* <div id="solutions"></div> */}
    </>
  );
};

export default About;
