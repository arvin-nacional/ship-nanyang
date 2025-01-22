/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
// import { ImageProps } from "@/types";
import dynamic from "next/dynamic";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
// Dynamically import the lightbox to ensure it works only in the browser
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

// const Zoom = dynamic(() => import("yet-another-react-lightbox/plugins/zoom"), {
//   ssr: false,
// });
interface Props {
  images: string;
}

const PaymentImages = ({ images }: Props) => {
  const [index, setIndex] = useState(-1);

  let imageList = [];

  if (images) {
    const parsedImages = JSON.parse(images);
    imageList = parsedImages;
  }

  return (
    <div>
      {/* <p className="h3-bold text-dark400_light900 mb-10 ">Related Images</p> */}
      <div className="flex w-full flex-wrap gap-5">
        {imageList.map((image: any, idx: any) => (
          <Image
            key={idx}
            src={image.src}
            alt={image.alt}
            onClick={() => setIndex(idx)}
            width={280}
            height={280}
            loading="lazy" // Add lazy loading here
            className="max-w-[450px] cursor-pointer rounded-lg object-cover shadow-md transition-transform hover:scale-105"
          />
        ))}
      </div>

      <div>
        {index >= 0 && (
          <Lightbox
            open={index >= 0}
            close={() => setIndex(-1)}
            slides={imageList}
            plugins={[Zoom]}
            index={index}
            // onIndexChange={setIndex}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentImages;
