"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
// import Theme from "./Theme";
import MobileNav from "./MobileNav";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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
  return (
    <nav
      className={cn(
        "flex-center background-light900_dark200 fixed z-50 w-full",
        scrolled ? "bg-primary-500 shadow-md" : "bg-primary-500"
      )}
    >
      <div className="flex-between gap-5 py-4  dark:shadow-none max-xl:w-full max-xl:p-6 max-sm:px-10 max-sm:py-6 xl:min-w-[1200px]">
        <Link href="/" className="flex items-center gap-1 ">
          <Image
            src="/assets/icons/logo-white.png"
            width={150}
            height={40}
            alt="logo"
          />
        </Link>
        <div className="flex gap-5 text-white max-md:hidden">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/#solutions">Solutions</Link>
          <Link href="/#services">Shipping Calculator</Link>
          <Link href="/contact">Locations</Link>
        </div>
        <div className="flex-between gap-5">
          <Link href="/contact">
            <Button className="rounded-3xl bg-slate-50 px-10 text-primary-500">
              Contact Us
            </Button>
          </Link>
          {/* <Theme /> */}
          {/* <SignedOut>
            <Link href="/sign-in" className="max-lg:hidden">
              <Avatar>
                <AvatarImage
                  src="/assets/images/default_user.svg"
                  alt="Avatar"
                />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
            </Link>
          </SignedOut>
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
          </SignedIn> */}

          {/* <Sidebar /> */}

          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
