"use client";

import React from "react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { usePathname } from "next/navigation";
// import { useTheme } from "@/context/ThemeProvider";

const NavContent = () => {
  const pathname = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 pt-5">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;
        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  // const { mode } = useTheme();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 flex h-full flex-col justify-between border-none"
      >
        <VisuallyHidden.Root>
          <SheetTitle>Menu</SheetTitle>
        </VisuallyHidden.Root>
        <div>
          <div className="my-5 p-3">
            <Image
              src="/assets/icons/full-color-logo.png"
              width={150}
              height={40}
              alt="logo"
            />
          </div>
          <div>
            <SheetClose asChild>
              <NavContent />
            </SheetClose>
            {/* <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    Sign up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut> */}
          </div>
        </div>

        <div className="flex gap-5 p-6">
          <a
            href="https://www.facebook.com/sdexpressinternational"
            target="_blank"
          >
            <Image
              src="/assets/icons/facebook.svg"
              width={20}
              height={20}
              alt="logo"
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
            />
          </a> */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
