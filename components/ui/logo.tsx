"use client";

import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  const { mode } = useTheme();
  return (
    <div>
      {" "}
      {mode === "light" ? (
        <Link href="/user/dashboard">
          <Image
            src="/assets/icons/logo-primary.png"
            width={150}
            height={40}
            alt="logo"
          />
        </Link>
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
