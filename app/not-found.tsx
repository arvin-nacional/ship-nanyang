"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <p className="h2-bold text-primary-500 mb-5">Page Not Found</p>

      <p className="paragraph-regular text-dark-500">
        We could not find the page you were looking for.
      </p>
      <Link href="/user/dashboard">
        <Button className="bg-primary-500 text-light-800">
          Go back to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
