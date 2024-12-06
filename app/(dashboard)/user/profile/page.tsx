"use client";

import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { Edit } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  const { user } = useClerk();
  return (
    <div className="p-12 w-full" style={{ height: "100vh" }}>
      <div className="flex justify-between">
        <p className="h3-semibold mb-5">Profile Info</p>
        <Link href={`create/${user?.id}`}>
          <Button className="px-6 rounded-3xl border border-green-800 text-green-800 hover:text-light-800 hover:bg-green-800">
            <Edit />
            Edit Profile
          </Button>
        </Link>
      </div>

      <div className="flex gap-5 w-full">
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">First Name</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            First Name
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">Last Name</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            Last Name
          </p>
        </div>
      </div>
      <div className="flex gap-5 w-full mt-5">
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">Contact Number</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            Contact Number
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">Email</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            Email Address
          </p>
        </div>
      </div>
      <div className="flex gap-5 w-full mt-5">
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">Address Line 1</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            Contact Number
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">Address Line 2</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            Email Address
          </p>
        </div>
      </div>
      <div className="flex gap-5 w-full mt-5">
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">Province</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            Metro Manila
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">City</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            City
          </p>
        </div>
      </div>
      <div className="flex gap-5 w-full mt-5">
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">Province</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            Metro Manila
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">City</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            City
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
