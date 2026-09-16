/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getCountryName } from "@/constants/countries";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import emailjs from "@emailjs/browser";

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
import { useShipmentSubmission } from "@/hooks/use-shipment-submission";
import { useUser } from "@clerk/nextjs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Props {
  type?: string;
  orderDetails?: string;
  address?: string;
  orders?: string;
  addressId?: string;
  orderId?: string;
  userType?: string;
  admin?: boolean;
}

const Order = ({
  type,
  address,
  orders,
  addressId,
  orderId,
  userType,
  admin,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const submission = useShipmentSubmission();
  const { user, isLoaded, isSignedIn } = useUser();

  const parsedAddress = JSON.parse(address || "{}");
  const parsedOrders = JSON.parse(orders || "{}");

  const { toast } = useToast();

  const parsedAddressId = addressId ? JSON.parse(addressId) : null;

  const form = useForm<z.infer<typeof CreateOrderSchema>>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      vendor: "",
      trackingNumber: "",
      value: "",
      description: "",
      address: parsedAddressId || "",
      type: type === "consolidation" ? "consolidation" : "singleOrder",
      orderId: orderId || "",
    },
  });

  async function onSubmit(data: z.infer<typeof CreateOrderSchema>) {
    form.clearErrors("root");
    const clerkId = user?.id;
    if (!isLoaded || !isSignedIn || !clerkId) {
      form.setError("root", { message: "Your session is unavailable. Please sign in again." });
      return;
    }
    const payload = { ...data, clerkId, orderId: data.orderId || "" };
    const requestId = submission.begin(payload);
    if (!requestId) return;
    startTransition(async () => {
      try {
        const result = await createPackage({ ...payload, requestId });
        if (!result.success) {
          const message = result.error + (result.reference ? " Reference: " + result.reference : "");
          form.setError("root", { message });
          toast({ title: "Shipment not saved", description: message, variant: "destructive" });
          return;
        }
        toast({ title: "Shipment saved", description: "Your shipment has been added to the cart." });
        router.push((admin || userType === "admin")
          ? `/admin/shipping-carts/${result.orderId}`
          : `/user/packages/${result.orderId}`);
      } catch {
        form.setError("root", { message: "We couldn't confirm the save. Please retry without refreshing; your entries are still here. Reference: " + requestId });
      } finally {
        submission.finish();
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
                          {/* {parsedAddress?.addresses?.map((item: any) => (
                      <SelectItem key={item._id} value={item._id}>
                        {item.name} - {item.contactNumber} - {item.addressLine1}
                        , {item.addressLine2}, {item.city}, {item.province},{" "}
                        {item.postalCode} {getCountryName(item.country)}
                      </SelectItem>
                    ))} */}

                          <SelectItem value="singleOrder" className="cursor-pointer focus:bg-light-700 dark:focus:bg-dark-300">New Order</SelectItem>
                          <SelectItem value="consolidation" className="cursor-pointer focus:bg-light-700 dark:focus:bg-dark-300">Consolidate to an Existing Order</SelectItem>
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
                            {parsedOrders?.orders?.map((item: any) => (
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
                  Value (USD) <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
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
          {form.watch("type") === "singleOrder" &&
            (!admin ? (
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
                          {parsedAddress?.addresses?.map((item: any) => (
                            <SelectItem key={item._id} value={item._id} className="cursor-pointer focus:bg-light-700 dark:focus:bg-dark-300 truncate overflow-hidden">
                              {item.name} - {item.contactNumber} -{" "}
                              {item.addressLine1}, {item.addressLine2}, {getCountryName(item.country)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <FormLabel>Receiver</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border w-full justify-between"
                        >
                          {field.value
                            ? parsedAddress?.addresses?.find(
                                (item: any) => item._id === field.value
                              )?.name
                            : "Select Address"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-full min-w-[var(--radix-popover-trigger-width)] p-0"
                        align="start" // Ensures proper alignment with the trigger
                      >
                        <Command>
                          <CommandInput placeholder="Search address..." />
                          <CommandList>
                            <CommandEmpty>No receiver found.</CommandEmpty>
                            <CommandGroup>
                              {parsedAddress?.addresses?.map((item: any) => (
                                <CommandItem
                                  key={item._id}
                                  value={item.name}
                                  onSelect={() => field.onChange(item._id)}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === item._id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  <span>{item.name}</span>
                                  <div className="truncate text-xs ">
                                    {item.contactNumber} {item.addressLine1} {getCountryName(item.country)}
                                    {item.city}
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
        </div>
        {form.formState.errors.root && (
          <p role="alert" className="text-red-500">{form.formState.errors.root.message}</p>
        )}
        <Button
          type="submit"
          className="bg-primary-500 w-fit !text-light-900 hover:bg-primary-400"
          disabled={
            (form.watch("type") === "consolidation" &&
              !form.watch("orderId")) ||
            isPending || !isLoaded || !isSignedIn
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
