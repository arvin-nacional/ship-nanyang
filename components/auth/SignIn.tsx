"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import React from "react";

const SignInComponent = () => {
  const { user } = useUser();

  const getRedirectUrl = () => {
    const userType = user?.publicMetadata?.userType as string;

    if (userType === "admin") {
      return "/admin/dashboard";
    }

    return "/user/dashboard";
  };
  return (
    <div>
      <SignIn
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
        signUpUrl="/signup"
        forceRedirectUrl={getRedirectUrl()}
        routing="hash"
        afterSignOutUrl={"/"}
      />
    </div>
  );
};

export default SignInComponent;
