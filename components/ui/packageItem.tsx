"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

import { FilePenLine, PackageX, PhilippinePeso } from "lucide-react";
import { removePackage } from "@/lib/actions/package.action";
import { usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { capitalizeWords } from "@/lib/utils";

interface Props {
  vendorName: string;
  description: string;
  trackingNumber: string;
  date: string;
  status: string;
  packageId: string;
  value: string;
  userType: string;
  finalAmount: string;
}

const PackageItem = ({
  vendorName,
  description,
  trackingNumber,
  date,
  status,
  packageId,
  value,
  userType,
  finalAmount,
}: Props) => {
  const pathname = usePathname();
  const parsedId = JSON.parse(packageId);

  const { toast } = useToast();
  return (
    <div className="border-b-2 border-red-500 py-2 flex  flex-wrap justify-between max-sm:flex-col gap-2">
      <div className="flex flex-col gap-2 w-[120px] max-sm:w-full">
        <p className="small-regular text-primary-500">Vendor</p>
        <p className="body-regular ">{vendorName}</p>
      </div>
      <div className="flex flex-col gap-2 w-[180px] max-sm:w-full">
        <p className="small-regular text-primary-500">Description</p>
        <p className="body-regular ">{description}</p>
      </div>
      <div className="flex flex-col gap-2 w-[180px] max-sm:w-full">
        <p className="small-regular text-primary-500">Tracking Number (CN)</p>
        <p className="body-regular ">{trackingNumber}</p>
      </div>
      <div className="flex flex-col gap-2 w-[100px]  max-sm:w-full">
        <p className="small-regular text-primary-500">Item Value</p>
        <p className="body-regular ">{value}</p>
      </div>
      <div className="flex flex-col gap-2 w-[100px] max-sm:w-full">
        <p className="small-regular text-primary-500">Date</p>
        <p className="body-regular ">{date}</p>
      </div>
      <div className="flex flex-col gap-2 w-[100px] max-sm:w-full">
        <p className="small-regular text-primary-500">Shipment Price</p>
        <div className="flex gap-1 items-center">
          <PhilippinePeso size={16} />{" "}
          <p className="body-regular ">{finalAmount}</p>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-2 w-[100px] max-sm:w-full">
          <p className="small-regular text-primary-500">Status</p>
          <p className="body-regular">{capitalizeWords(status)}</p>
        </div>
      </div>

      <div className="w-[130px]">
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="text-primary-500 flex cursor-pointer border border-primary-500 items-center gap-4 px-6 py-2 dark:focus:bg-dark-400 rounded-md hover:bg-primary-500 hover:text-light-900 transition-all group">
            <PackageX className="text-primary-500 group-hover:text-white size-4" />
            <p className="group-hover:text-white">Delete</p>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="background-light900_dark300 text-dark400_light700">
            <AlertDialogHeader>
              <AlertDialogTitle>Remove the Package?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                package and remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-primary-500 text-light-800"
                onClick={() => {
                  removePackage(parsedId, pathname);
                  toast({
                    title: "Package removed successfully",
                    description: "The package has been removed from the list",
                  });
                }}
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {userType === "admin" && (
        <Link href={"/admin/packages/update/" + parsedId} className="py-2">
          <FilePenLine className="text-green-600 cursor-pointer" size={22} />
        </Link>
      )}
    </div>
  );
};

export default PackageItem;
