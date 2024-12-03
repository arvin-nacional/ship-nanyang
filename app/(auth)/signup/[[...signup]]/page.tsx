import SignUpComponent from "@/components/auth/SignUp";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="mt-[120px] mb-16 flex flex-row gap-20 max-sm:flex-col items-center">
      <Image
        src="/assets/images/sign-in-img.png"
        height={550}
        width={500}
        alt="Sign-in Image"
        className="max-sm:hidden"
      />
      <SignUpComponent />
    </div>
  );
};

export default Page;
