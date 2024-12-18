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

import { PackageX } from "lucide-react";
import { removePackage } from "@/lib/actions/package.action";
import { usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface Props {
  vendorName: string;
  description: string;
  trackingNumber: string;
  date: string;
  status: string;
  packageId: string;
}

const PackageItem = ({
  vendorName,
  description,
  trackingNumber,
  date,
  status,
  packageId,
}: Props) => {
  const pathname = usePathname();
  const parsedId = JSON.parse(packageId);

  const { toast } = useToast();
  return (
    <div className="border-b-2 border-red-500 py-2 flex  flex-wrap justify-between ">
      <div className="flex flex-col gap-2 w-[120px] ">
        <p className="small-regular ">Vendor</p>
        <p className="body-regular ">{vendorName}</p>
      </div>
      <div className="flex flex-col gap-2 w-[180px] ">
        <p className="small-regular">Description</p>
        <p className="body-regular ">{description}</p>
      </div>
      <div className="flex flex-col gap-2 w-[180px] ">
        <p className="small-regular">Tracking Number</p>
        <p className="body-regular ">{trackingNumber}</p>
      </div>
      <div className="flex flex-col gap-2 w-[100px]  ">
        <p className="small-regular">Item Value</p>
        <p className="body-regular ">Amount</p>
      </div>
      <div className="flex flex-col gap-2 w-[100px] ">
        <p className="small-regular">Date</p>
        <p className="body-regular ">{date}</p>
      </div>
      <div className="flex flex-col gap-2 w-[100px] ">
        <p className="small-regular">Shipment Price</p>
        <p className="body-regular ">Amount</p>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-2 w-[50px] ">
          <p className="small-regular">Status</p>
          <p className="body-regular">{status}</p>
        </div>
      </div>
      <div className="w-[40px]">
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="text-dark100_light900 flex cursor-pointer items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400">
              <PackageX className="text-primary-500" />
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
    </div>
  );
};

export default PackageItem;
