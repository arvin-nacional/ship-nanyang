"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema } from "@/lib/validations";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "@/lib/actions/address.action";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Trash2 } from "lucide-react";

interface Props {
  type?: string;
  addressDetails?: string;
  addressId?: string;
}

const Address = ({ type, addressDetails, addressId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const parsedAddressDetails = JSON.parse(addressDetails || "{}");

  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      addressLine1: parsedAddressDetails?.addressLine1 || "",
      addressLine2: parsedAddressDetails?.addressLine2 || "",
      city: parsedAddressDetails?.city || "",
      province: parsedAddressDetails?.province || "",
      postalCode: parsedAddressDetails?.postalCode || "",
      contactNumber: parsedAddressDetails?.contactNumber || "",
      name: parsedAddressDetails?.name || "",
    },
  });

  async function onSubmit(data: z.infer<typeof AddressSchema>) {
    startTransition(async () => {
      try {
        if (type === "create") {
          await createAddress({
            clerkId: user?.id ?? "",
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            city: data.city,
            province: data.province,
            postalCode: data.postalCode,
            contactNumber: data.contactNumber,
            name: data.name,
            path: pathname,
          });

          router.push("/user/address");
        } else {
          await updateAddress(addressId ?? "", {
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            city: data.city,
            province: data.province,
            postalCode: data.postalCode,
            contactNumber: data.contactNumber,
            name: data.name,
          });

          router.push("/user/address");
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteAddress(addressId ?? "");
        router.push("/user/address");
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      {type === "create" ? (
        <p className="h2-bold mb-5">Add Address</p>
      ) : (
        <div className="flex justify-between">
          <p className="h2-bold mb-5">Edit Address</p>
          <Button className="border border-gray-600" onClick={handleDelete}>
            <Trash2 />
            Delete Address
          </Button>
        </div>
      )}

      <Form {...form}>
        <form
          className="flex w-full flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-row gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Contact Person <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                      placeholder="Enter contact person"
                    />
                  </FormControl>
                  {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Create a title for your post.
              </FormDescription> */}
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Contact Number<span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                      placeholder="Enter contact number"
                    />
                  </FormControl>
                  {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Create a title for your post.
              </FormDescription> */}
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-5">
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Address Line 1 <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                      placeholder="Enter address line 1"
                    />
                  </FormControl>
                  {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Create a title for your post.
              </FormDescription> */}
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine2"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Address Line 2 <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                      placeholder="Enter address line 2"
                    />
                  </FormControl>
                  {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Create a title for your post.
              </FormDescription> */}
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-5">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    City <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                      placeholder="Enter City Name"
                    />
                  </FormControl>
                  {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Create a title for your post.
              </FormDescription> */}
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Province <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                      placeholder="Metro Manila or Other Province"
                    />
                  </FormControl>
                  {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Create a title for your post.
              </FormDescription> */}
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-5">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Postal Code <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                      placeholder="Enter postal code"
                    />
                  </FormControl>
                  {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Create a title for your post.
              </FormDescription> */}
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="w-full"></div>
          </div>

          <Button
            type="submit"
            className="w-fit rounded-3xl bg-primary-500 px-10 !text-light-900"
            disabled={isPending}
          >
            {isPending ? "Saving" : "Save"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Address;
