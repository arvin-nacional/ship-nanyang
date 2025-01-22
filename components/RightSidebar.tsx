"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Copy, PackagePlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const RightSidebar = () => {
  return (
    <div
      className="w-[400px] bg-light-900 p-6 shadow-lg h-container max-sm:w-full"
      //   style={{ height: "100vh" }}
    >
      <Link href="/user/add-package">
        <Button className="px-5 border border-primary-500 hover:bg-primary-400 rounded-3xl w-full bg-primary-500 text-light-800 mb-5">
          <PackagePlus /> Add Package
        </Button>
      </Link>
      <p className="base-semibold text-dark-400 mb-5">Your Shipping Address</p>
      <div className="p-5 rounded-sm shadow-lg bg-light-800">
        <p className="base-semibold">AirFreight Address: </p>
        <p>
          收件人： 郑建盛13326968789
          广东省中山市沙溪镇新濠路24号后座——超凡转28292号 邮政编码：528400
        </p>
        <p>(Package Marking Number)唛头: 28292</p>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              "收件人： 郑建盛13326968789 广东省中山市沙溪镇新濠路24号后座——超凡转28292号 邮政编码：528400 (Package Marking Number)唛头: 28292"
            );

            toast({
              title: "Address Copied",
              description: "Address copied to clipboard.",
            });
          }}
          className="mt-3 px-4 py-2 text-primary-400  small-regular border border-primary-500 rounded-lg hover:text-light-800 hover:bg-primary-400"
        >
          <Copy /> Copy Address
        </Button>
      </div>
    </div>
  );
};

export default RightSidebar;
