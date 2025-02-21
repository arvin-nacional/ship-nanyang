"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { isUserVerified } from "@/lib/actions/user.action";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const { user } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    const checkPosition = () => {
      if (window.scrollY === 0) {
        setScrolled(false);
      } else {
        setScrolled(true);
      }
    };

    checkPosition(); // Initial check
    window.addEventListener("scroll", checkPosition);

    return () => {
      window.removeEventListener("scroll", checkPosition);
    };
  }, []);

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      if (user) {
        const { verified } = await isUserVerified({ clerkId: user.id });
        setIsVerified(verified);
      } else {
        setIsVerified(null);
      }
    };

    fetchVerificationStatus();
  }, [user]);

  return (
    // only show the transarent navbar on home
    <nav
      className={cn(
        "flex-center background-light900_dark200 fixed z-[999] w-full",
        scrolled || pathname !== "/"
          ? "bg-primary-500 shadow-md"
          : "navbar-transparent"
      )}
    >
      <div className="flex-between gap-5 py-4 dark:shadow-none max-xl:w-full max-xl:p-6 max-sm:px-10 max-sm:py-6 xl:min-w-[1200px]">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/icons/logo-white-2.png"
            width={150}
            height={40}
            alt="logo"
          />
        </Link>
        <div className="flex gap-5 text-white max-md:hidden">
          <Link href="/" className="base-regular">
            Home
          </Link>
          <Link href="/about" className="base-regular">
            About Us
          </Link>
          <Link href="/#solutions" className="base-regular">
            Solutions
          </Link>
          <Link href="/shipping-calculator" className="base-regular">
            Shipping Calculator
          </Link>
          <Link href="/locations" className="base-regular">
            Locations
          </Link>
        </div>
        <div className="flex-between gap-5">
          <SignedOut>
            <Link href="/signin" className="max-lg:hidden">
              <Button className="rounded-3xl border-2 border-light-850 px-10 text-light-800">
                Track Your Package
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="rounded-3xl bg-slate-50 px-10 text-primary-500">
                Register Now
              </Button>
            </Link>
            {/* <Link href="/signin" className="sm:hidden">
              <Button className="rounded-3xl bg-slate-50 px-10 text-primary-500">
                Sign In
              </Button>
            </Link> */}
          </SignedOut>

          <SignedIn>
            {pathname !== "/create-account" && (
              <Link
                href={isVerified ? "/user/dashboard" : "/create-account"}
                className="max-lg:hidden"
              >
                <Button className="rounded-3xl border-2 border-light-850 px-10 text-light-800">
                  Track Your Package
                </Button>
              </Link>
            )}
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

          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
