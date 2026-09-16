import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SignInComponent from "@/components/auth/SignIn";
import Image from "next/image";
import React from "react";

const Page = async () => {
  const { userId } = await auth();
  if (userId) redirect("/create-account");

  return (
    <div className="mt-[120px] mb-16 flex flex-row gap-20 max-sm:flex-col items-center">
      <Image
        src="/assets/images/sign-in-img4.png"
        height={550}
        width={500}
        alt="Sign-in Image"
        className="max-sm:hidden"
      />
      <SignInComponent />
    </div>
  );
};

export default Page;
