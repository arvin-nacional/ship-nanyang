"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

interface Props {
  userName: string;
  userType: string;
}

const Topbar = ({ userName, userType }: Props) => {
  const [currencyRate, setCurrencyRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchCurrencyRate = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        setCurrencyRate(data.rates.PHP);
      } catch (error) {
        console.error("Error fetching currency rate:", error);
      }
    };

    fetchCurrencyRate();
  }, []);
  return (
    <div className="z-50 w-full">
      <div className="py-4 bg-light-800 flex justify-between px-6 gap-10 ">
        <div className="flex items-center gap-2">
          <span className="base-regular">Hi,</span>
          <span className="base-semibold text-primary-500">{userName}</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="small-regular">Currency Rate:</span>
            <span className="paragraph-regular max-sm:small-regular">
              {currencyRate} PHP
            </span>
          </div>

          <Link
            href={
              userType === "admin"
                ? "/admin/shipping-calculator"
                : "/user/shipping-calculator"
            }
          >
            <Button className="px-10 rounded-3xl border border-primary-500 text-primary-500 hover:bg-primary-400 hover:text-light-900 max-sm:hidden">
              Estimate Shipment
            </Button>
          </Link>
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
        </div>
      </div>
    </div>
  );
};

export default Topbar;
