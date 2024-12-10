import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const RightSidebar = () => {
  return (
    <div
      className="w-[300px] bg-light-900 p-6 shadow-lg h-container"
      //   style={{ height: "100vh" }}
    >
      <Link href="/user/add-package">
        <Button className="px-5 border border-primary-500 rounded-3xl w-full bg-primary-500 text-light-800 mb-5">
          Add Package
        </Button>
      </Link>
      <p className="base-semibold text-dark-400">Your Shipping Address</p>
    </div>
  );
};

export default RightSidebar;
