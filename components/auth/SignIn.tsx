import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInComponent = () => {
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
      />
    </div>
  );
};

export default SignInComponent;
