/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { CreateOrderSchema } from "@/lib/validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createPackage } from "@/lib/actions/package.action";
import { useUser } from "@clerk/nextjs";

interface Props {
  type?: string;
  orderDetails?: string;
  address?: string;
  orders?: string;
}

const Order = ({ type, address, orders }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { user } = useUser();
  const form = useForm<z.infer<typeof CreateOrderSchema>>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      vendor: "",
      trackingNumber: "",
      value: "",
      description: "",
      address: "",
      type: "",
      orderId: "",
    },
  });

  const parsedAddress = JSON.parse(address || "{}");
  const parsedOrders = JSON.parse(orders || "{}");

  // todo
  // create a new package
  // create new order
  // edit an existing package

  async function onSubmit(data: z.infer<typeof CreateOrderSchema>) {
    startTransition(async () => {
      try {
        if (user) {
          await createPackage({
            clerkId: user.id,
            vendor: data.vendor,
            trackingNumber: data.trackingNumber,
            value: data.value,
            description: data.description,
            address: data.address,
            type: data.type,
            orderId: data.orderId || "",
          });
        } else {
          console.error("User is not authenticated");
        }
        router.push("/user/dashboard");
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2  gap-5 max-sm:grid-cols-1">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Address <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                        <SelectValue placeholder="Select Order Type" />
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

                      <SelectItem value="singleOrder">Single Order</SelectItem>
                      <SelectItem value="consolidation">
                        Consolidation
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
          {form.watch("type") === "consolidation" && (
            <FormField
              control={form.control}
              name="orderId"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Order Name <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                          <SelectValue placeholder="Select Order Name" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-light-900">
                        {parsedOrders?.orders.map((item: any) => (
                          <SelectItem key={item._id} value={item._id}>
                            {item.name}
                          </SelectItem>
                        ))}
                        {/* <SelectItem value="defaultAddress">
                      Profile Address
                    </SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem> */}
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
          )}

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
            name="address"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Address <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                        <SelectValue placeholder="Select Receiver Address" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-light-900">
                      {parsedAddress?.addresses.map((item: any) => (
                        <SelectItem key={item._id} value={item._id}>
                          {item.name} - {item.contactNumber} -{" "}
                          {item.addressLine1}, {item.addressLine2}, {item.city},{" "}
                          {item.province}, {item.postalCode}
                        </SelectItem>
                      ))}

                      {/* <SelectItem value="defaultAddress">
                      Profile Address
                    </SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem> */}
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
        </div>
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={
            form.watch("type") === "consolidation" && !form.watch("orderId")
          }
        >
          {isPending ? (
            <>{type === "Edit" ? "Saving..." : "Submitting"}</>
          ) : (
            <>{type === "Edit" ? "Save" : "Submit"}</>
          )}
        </Button>
      </form>{" "}
    </Form>
  );
};

export default Order;
