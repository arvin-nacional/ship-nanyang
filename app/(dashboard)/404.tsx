"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      Page Not Found
      <Link href="/user/dashboard">
        <Button className="bg-primary-500 text-light-800">
          Go back to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default page;
