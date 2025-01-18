"use client";

import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";

const Logo = () => {
  const { mode } = useTheme();
  return (
    <div>
      {" "}
      {mode === "light" ? (
        <Image
          src="/assets/icons/logo-primary.png"
          width={150}
          height={40}
          alt="logo"
        />
      ) : (
        <Image
          src="/assets/images/primary-logo-light.svg"
          width={150}
          height={40}
          alt="logo"
        />
      )}
    </div>
  );
};

export default Logo;
