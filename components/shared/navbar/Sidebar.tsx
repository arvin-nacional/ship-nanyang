import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
// import { useTheme } from "@/context/ThemeProvider";
// import Subscriber from "@/components/forms/Subscriber";
import Logo from "@/components/ui/logo";

const Sidebar = () => {
  // const { mode } = useTheme();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/menu-05.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors cursor-pointer max-sm:hidden"
        />
      </SheetTrigger>
      <SheetContent className="background-light900_dark200 flex-center h-full grow  flex-col border-none">
        <SheetHeader className="text-dark100_light900 mt-2 p-8">
          <Logo />
          <SheetTitle className="mt-5">
            <p className="h3-bold">
              Do you have a project in your mind? Let&apos;s connect!
            </p>
          </SheetTitle>
          <SheetDescription className="mt-10 "></SheetDescription>
        </SheetHeader>
        <div className="text-dark400_light800 p-6">
          <p className="h3-bold">Contact</p>
          <div className="body-regular">
            <div className=" mt-3 flex gap-5">
              <Image
                src="/assets/icons/telephone-call.png"
                width={20}
                height={20}
                alt="logo"
              />
              <p>+63 965 9256 451</p>
            </div>
            <div className="mt-3 flex gap-5 ">
              <Image
                src="/assets/icons/paper-plane.png"
                width={20}
                height={20}
                alt="logo"
              />
              <p>arvin@rvinpaul.com</p>
            </div>
            <div className="mt-3 flex gap-5 ">
              <Image
                src="/assets/icons/location-pin.png"
                width={20}
                height={20}
                alt="logo"
              />
              <p>Camarin, Caloocan City, Philippines</p>
            </div>
          </div>
        </div>
        {/* subscribe form */}
        <div className="text-dark400_light800 mt-5 p-6">
          <p className="h3-bold">Subscribe</p>
          <p className="small-regular mb-3 py-2">
            Subscribe to get our latest news and updates.
          </p>
          {/* <Subscriber type="sidebar" /> */}
        </div>

        {/* social media links */}
        <SheetFooter className="w-full">
          <div className="flex gap-5 p-6">
            <a href="https://www.facebook.com/rvinpaul" target="_blank">
              <Image
                src="/assets/icons/facebook.svg"
                width={20}
                height={20}
                alt="logo"
                className="invert-colors"
              />
            </a>
            {/* <a href="https://www.instagram.com/rvinpaul" target="_blank">
              <Image
                src="/assets/icons/instagram.svg"
                width={20}
                height={20}
                alt="logo"
                className="invert-colors"
              />
            </a>
            <a href="https://www.linkedin.com/rvinpaul" target="_blank">
              <Image
                src="/assets/icons/linkedin.svg"
                width={20}
                height={20}
                alt="logo"
                className="invert-colors"
              />
            </a> */}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
