"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import React from "react";

const SignUpComponent = () => {
  const { user } = useUser();

  const getRedirectUrl = () => {
    const userType = user?.publicMetadata?.userType as string;
    const isVerified = user?.publicMetadata?.verified as boolean;
    if (userType === "admin") {
      return "/admin/dashboard";
    } else if (userType === "user") {
      return "/user/dashboard";
    } else if (userType === "user" && !isVerified) {
      return "/create-account";
    }

    return "/create-account";
  };
  return (
    <div>
      <SignUp
        appearance={{
          elements: {
            // footer: {
            //   "& > div > div:nth-child(1)": {
            //     background: "#E3B0B5",
            //   },
            // },

            formButtonPrimary:
              "bg-primary-500 hover:bg-primary-400 text-white-100 border-none border-primary-500",
            footerActionLink: "text-primary-500 hover:text-primary-400",
          },
        }}
        signInUrl="/signin"
        forceRedirectUrl={getRedirectUrl()}
        routing="hash"
        afterSignOutUrl={"/"}
      />
    </div>
  );
};

export default SignUpComponent;
