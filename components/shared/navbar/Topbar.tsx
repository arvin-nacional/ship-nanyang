"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

const Topbar = () => {
  return (
    <div className="w-full z-50 fixed">
      <div className="py-4 bg-light-800 flex justify-end px-12 ">
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
            showName={true}
          />
        </SignedIn>
      </div>
    </div>
  );
};

export default Topbar;
