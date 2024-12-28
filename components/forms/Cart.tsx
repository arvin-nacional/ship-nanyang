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
import { usePathname, useRouter } from "next/navigation";
import { UpdateOrderSchema } from "@/lib/validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { updateOrder } from "@/lib/actions/order.action";

interface Props {
  shippingDetails: string;
}

const Cart = ({ shippingDetails }: Props) => {
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  const router = useRouter();
  const parsedShippingDetails = JSON.parse(shippingDetails);

  const form = useForm<z.infer<typeof UpdateOrderSchema>>({
    resolver: zodResolver(UpdateOrderSchema),
    defaultValues: {
      status: parsedShippingDetails?.status,
      paymentStatus: parsedShippingDetails?.paymentStatus,
      finalAmount: parsedShippingDetails?.finalAmount?.toString() || "",
      insurance: parsedShippingDetails?.insurance || "",
      localDeliveryFee: parsedShippingDetails?.localDeliveryFee || "",
      miscellaneousFee: parsedShippingDetails?.miscellaneousFee || "",
    },
  });

  async function onSubmit(data: z.infer<typeof UpdateOrderSchema>) {
    startTransition(async () => {
      try {
        console.log(data);
        await updateOrder({
          orderId: parsedShippingDetails._id,
          status: data.status,
          finalAmount: data.finalAmount,
          paymentStatus: data.paymentStatus,
          insurance: data.insurance,
          localDeliveryFee: data.localDeliveryFee,
          miscellaneousFee: data.miscellaneousFee,
          path: pathname,
        });
        router.push(`/admin/shipping-carts/${parsedShippingDetails._id}`);
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <p className="paragraph-regular text-dark-300">Cart Name</p>
          <p className="h2-semibold text-primary-500">SD-#1020</p>
        </div>
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

                    <SelectItem value="created">Created</SelectItem>
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
          name="paymentStatus"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Payment Status <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                      <SelectValue placeholder="Select Payment Status" />
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
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="partially-paid">
                      Partially Paid
                    </SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
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
          name="insurance"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Insurance Fee <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                  placeholder="Enter insurance fee"
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
          name="miscellaneousFee"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Miscellaneous Fee <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                  placeholder="Enter miscellaneous fee"
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
          name="localDeliveryFee"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Local Delivery Fee <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                  placeholder="Enter local Delivery Fee"
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
          name="finalAmount"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Final Amount <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                  placeholder="Enter final amount"
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

export default Cart;
