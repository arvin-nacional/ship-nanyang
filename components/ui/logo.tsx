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
            src="/assets/icons/new-logo.png"
            width={150}
            height={40}
            alt="logo"
          />
        </Link>
      ) : (
        <Image
          src="/assets/images/full-color-logo.png"
          width={150}
          height={40}
          alt="logo"
        />
      )}
    </div>
  );
};

export default Logo;
