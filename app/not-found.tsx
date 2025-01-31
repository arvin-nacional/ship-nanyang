"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <p className="h2-bold text-primary-500 mb-12">Page Not Found</p>

      <p className="paragraph-regular text-dark-500 mb-12">
        We could not find the page you were looking for.
      </p>
      <Link href="/user/dashboard">
        <Button className="bg-primary-500 text-light-800">
          Go back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
