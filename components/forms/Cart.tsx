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
import { CreateOrderSchema, UpdateOrderSchema } from "@/lib/validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  shippingDetails: string;
}

const Cart = ({ shippingDetails }: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateOrderSchema>>({
    resolver: zodResolver(UpdateOrderSchema),
    defaultValues: {
      status: "",
      paymentStatus: "",
      finalAmount: "",
    },
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">
              Status <span className="text-primary-500">*</span>
            </FormLabel>
            <FormControl className="mt-3.5">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
      <FormField
        control={form.control}
        name="paymentStatus"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">
              Payment Status <span className="text-primary-500">*</span>
            </FormLabel>
            <FormControl className="mt-3.5">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
    </Form>
  );
};

export default Cart;
