"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  userName: string;
}

const Topbar = ({ userName }: Props) => {
  return (
    <div className="z-50 w-full">
      <div className="py-4 bg-light-800 flex justify-between px-6 gap-10 ">
        <div className="flex items-center gap-2">
          {userName ? (
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10",
                  },
                  variables: {
                    colorPrimary: "#ff7000",
                  },
                }}
              />
            </SignedIn>
          ) : (
            <Image
              src="/assets/images/default_user.svg"
              height={40}
              width={40}
              className="rounded-[50%]"
              alt="default Image"
            />
          )}
          <span className="base-regular">Hi,</span>
          <span className="base-semibold text-primary-500">{userName}</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="small-regular">Currency Rate of the Day:</span>
            <span className="paragraph-regular">58.00 PHP</span>
          </div>

          <Link href="/user/shipping-calculator">
            <Button className="px-10 rounded-3xl border border-primary-500 text-primary-500 hover:bg-primary-400 hover:text-light-900">
              Estimate Shipment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
