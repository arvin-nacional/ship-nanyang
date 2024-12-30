"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRouter } from "next/navigation";
import { UpdatePackageSchema } from "@/lib/validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { updatePackage } from "@/lib/actions/package.action";

interface Props {
  packageDetails: string;
}

const Package = ({ packageDetails }: Props) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const parsedPackageDetails = JSON.parse(packageDetails);

  const form = useForm<z.infer<typeof UpdatePackageSchema>>({
    resolver: zodResolver(UpdatePackageSchema),
    defaultValues: {
      vendor: parsedPackageDetails?.vendor || "",
      trackingNumber: parsedPackageDetails?.trackingNumber || "",
      value: parsedPackageDetails?.value || "",
      description: parsedPackageDetails?.description || "",
      shipmentPrice: parsedPackageDetails?.finalAmount?.toString() || "",
      status: parsedPackageDetails?.status || "",
    },
  });

  async function onSubmit(data: z.infer<typeof UpdatePackageSchema>) {
    startTransition(async () => {
      try {
        console.log(data);
        await updatePackage({
          packageId: parsedPackageDetails._id,
          vendor: data.vendor,
          trackingNumber: data.trackingNumber,
          value: data.value,
          description: data.description,
          shipmentPrice: data.shipmentPrice,
          status: data.status,
        });
      } catch (error) {
        console.error(error);
      } finally {
        router.push(`/admin/shipping-carts/${parsedPackageDetails.orderId}`);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="vendor"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Vendor Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                  placeholder="Enter vendor name"
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
          name="value"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Value (PHP) <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                  placeholder="Enter item value"
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
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Description <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                  placeholder="Enter item description"
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
          name="trackingNumber"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tracking Number <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                  placeholder="Enter tracking number"
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
          name="status"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Status <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                      <SelectValue placeholder="Select Cart Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-light-900">
                    {/* {parsedAddress?.addresses.map((item: any) => (
                      <SelectItem key={item._id} value={item._id}>
                        {item.name} - {item.contactNumber} - {item.addressLine1}
                        , {item.addressLine2}, {item.city}, {item.province},{" "}
                        {item.postalCode}
                      </SelectItem>
                    ))} */}

                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-warehouse">In Warehouse</SelectItem>
                    <SelectItem value="preparing">
                      Preparing for Shipment
                    </SelectItem>
                    <SelectItem value="in-transit">In Transit</SelectItem>
                    <SelectItem value="out-for-delivery">
                      Out for Delivery
                    </SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="failed-delivery-attempt">
                      Failed Delivery Attempt
                    </SelectItem>
                  </SelectContent>
                </Select>
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
          name="shipmentPrice"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Shipment Price <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                  placeholder="Enter tracking number"
                />
              </FormControl>
              {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                        Create a title for your post.
                      </FormDescription> */}
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-primary-500 w-fit !text-light-900 hover:bg-primary-400"
        >
          {isPending ? "Submitting" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default Package;
