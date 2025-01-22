import { Button } from "@/components/ui/button";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { Edit } from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { auth } from "@clerk/nextjs/server";

const Page = async () => {
  const { userId } = await auth();

  const result = userId ? await getUserByClerkId({ clerkId: userId }) : null;

  return (
    <div className="p-12 w-full" style={{ height: "100vh" }}>
      <div className="flex justify-between">
        <Breadcrumb className="mb-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/user/profile">Profile</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/user/address/">My Address</BreadcrumbLink>
            </BreadcrumbItem>
            {/* <BreadcrumbSeparator /> */}
            {/* <BreadcrumbItem>
              <BreadcrumbPage>Add</BreadcrumbPage>
            </BreadcrumbItem> */}
          </BreadcrumbList>
        </Breadcrumb>

        {result && (
          <Link href="/user/edit">
            <Button className="px-6 rounded-3xl border border-green-800 text-green-800 hover:text-light-800 hover:bg-green-800">
              <Edit />
              Edit Profile
            </Button>
          </Link>
        )}

        {!result && <></>}
      </div>

      <div className="flex gap-5 w-full max-sm:flex-col">
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">First Name</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            {result?.user.firstName}
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">Last Name</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            {result?.user.lastName}
          </p>
        </div>
      </div>
      <div className="flex gap-5 w-full mt-5 max-sm:flex-col">
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">Contact Number</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            {result?.user.address?.contactNumber}
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">Email</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            {result?.user.email}
          </p>
        </div>
      </div>
      <div className="flex gap-5 w-full mt-5 max-sm:flex-col">
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">Address Line 1</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            {result?.user.address?.addressLine1}
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">Address Line 2</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            {result?.user.address?.addressLine2}
          </p>
        </div>
      </div>
      <div className="flex gap-5 w-full mt-5 max-sm:flex-col">
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">Province</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            {result?.user.address?.province}
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">City</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            {result?.user.address?.city}
          </p>
        </div>
      </div>
      <div className="flex gap-5 w-full mt-5 max-sm:flex-col">
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">Postal Code</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            {result?.user.address?.postalCode}
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {/* <span className="paragraph-regular">City</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            City
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
