/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";

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
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Check, ChevronsUpDown } from "lucide-react";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "../ui/command";
// import { cn } from "@/lib/utils";

interface Props {
  type?: string;
  orderDetails?: string;
  address?: string;
  orders?: string;
  addressId?: string;
  orderId?: string;
  userType?: string;
  admin?: boolean;
  user?: string;
}

const OrderForUser = ({
  type,
  address,
  orders,
  addressId,
  orderId,
  userType,
  user,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const parsedUser = JSON.parse(user || "{}");
  console.log(parsedUser);
  const parsedAddress = JSON.parse(address || "{}");
  const parsedOrders = JSON.parse(orders || "{}");

  const parsedAddressId = addressId ? JSON.parse(addressId) : null;

  const form = useForm<z.infer<typeof CreateOrderSchema>>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      vendor: "",
      trackingNumber: "",
      value: "",
      description: "",
      address: parsedAddressId || "",
      type: type === "consolidation" ? "consolidation" : "",
      orderId: orderId || "",
    },
  });

  React.useEffect(() => {
    const selectedOrderId = form.watch("orderId");
    if (selectedOrderId) {
      const selectedOrder = parsedOrders?.orders?.find(
        (order: any) => order._id === selectedOrderId
      );
      if (selectedOrder) {
        form.setValue("address", selectedOrder.address);
      }
    }
  }, [form.watch("orderId")]);

  async function onSubmit(data: z.infer<typeof CreateOrderSchema>) {
    startTransition(async () => {
      const templateParams = {
        name: parsedUser?.firstName + " " + parsedUser?.lastName,
        vendor: data.vendor,
        trackingNumber: data.trackingNumber,
        value: data.value,
        description: data.description,
      };

      await emailjs.send(
        "service_1bcie1i",
        "template_2n6x7ol",
        templateParams,
        "fDv2DYRFGmAq1kj7y"
      );

      if (type === "consolidation" && data.orderId) {
        try {
          if (user) {
            await createPackage({
              clerkId: parsedUser.clerkId,
              vendor: data.vendor,
              trackingNumber: data.trackingNumber,
              value: data.value,
              description: data.description,
              address: data.address,
              type: "consolidation",
              orderId: data.orderId,
            });
          } else {
            console.error("User is not authenticated");
          }

          router.push(
            userType === "admin"
              ? `/admin/shipping-carts/${orderId}`
              : `/user/packages/${orderId}`
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          if (user) {
            await createPackage({
              clerkId: parsedUser.clerkId,
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
          {type !== "consolidation" && (
            <>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                      Order Type <span className="text-primary-500">*</span>
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

                          <SelectItem value="singleOrder">New Order</SelectItem>
                          <SelectItem value="consolidation">
                            Consolidate to an Existing Order
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
            </>
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
          {form.watch("type") === "singleOrder" && (
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
                            {item.addressLine1}, {item.addressLine2},{" "}
                            {item.city}, {item.province}, {item.postalCode}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          )}
        </div>
        <Button
          type="submit"
          className="bg-primary-500 w-fit !text-light-900 hover:bg-primary-400"
          disabled={
            (form.watch("type") === "consolidation" &&
              !form.watch("orderId")) ||
            isPending
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

export default OrderForUser;
