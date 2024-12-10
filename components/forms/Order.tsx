"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { updateUser } from "@/lib/actions/user.action";
import { useParams, usePathname, useRouter } from "next/navigation";
import { CreateOrderSchema } from "@/lib/validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  type?: string;
  orderDetails?: string;
}

const Order = ({ type, orderDetails }: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateOrderSchema>>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      vendor: "",
      trackingNumber: "",
      itemValue: "",
      itemDescription: "",
    },
  });

  // todo
  // create a new package
  // create new order
  // edit an existing package
  // create address also modify profile address

  return (
    <Form {...form}>
      <form className="flex w-full flex-col gap-5">
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
          name="itemValue"
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
          name="itemDescription"
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
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-light-900">
                    <SelectItem value="defaultAddress">
                      Profile Address
                    </SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
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

        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
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
