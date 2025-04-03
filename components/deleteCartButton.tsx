"use client";

import { deleteCart } from "@/lib/actions/order.action";
import { Trash } from "lucide-react";
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
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

import { useRouter } from "next/navigation";

const DeleteCartButton = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <div>
      <div className="w-[40px]">
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="text-dark100_light900 flex cursor-pointer items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400">
              <Trash className="text-gray-900" />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="background-light900_dark300 text-dark400_light700">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete the Cart?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                Cart and remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-primary-500 text-light-800"
                onClick={() => {
                  deleteCart(id);
                  toast({
                    title: "Cart removed successfully",
                    description: "The package has been removed from the list",
                  });

                  router.push("/admin/shipping-carts");
                }}
              >
                Delete Cart
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default DeleteCartButton;
