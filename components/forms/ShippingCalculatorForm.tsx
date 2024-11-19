"use client";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ShippingCalculatorFormSchema } from "@/lib/validations";
import { type } from "os";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ShippingCalculatorForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof ShippingCalculatorFormSchema>>({
    resolver: zodResolver(ShippingCalculatorFormSchema),
    defaultValues: {
      weight: "",
      height: "",
      length: "",
      width: "",
      type: "",
      destination: "",
      value: "",
      unit: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof ShippingCalculatorFormSchema>
  ) {
    setIsSubmitting(true);
    try {
      await console.log(values);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <div className="flex flex-row gap-5">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col ">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Destination <span className="text-primary-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="cursor-pointer bg-light-900">
                    <SelectItem value="male">Metro Manila</SelectItem>
                    <SelectItem value="female">Provincial Address</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Select your destination.
                </FormDescription>
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
                  Value<span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Write the value of the package in Peso.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-5 w-full">
          <div className="flex flex-row gap-5 !w-[50%]">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Actual Weight<span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Write the Actual Weight in Kilograms.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="!w-[50%]">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col ">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                      Unit <span className="text-primary-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="cursor-pointer bg-light-900">
                        <SelectItem value="male">kg</SelectItem>
                        <SelectItem value="female">lb</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="body-regular mt-2.5 text-light-500">
                      Select unit of weight.
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-[50%]">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col ">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Item Type <span className="text-primary-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="cursor-pointer bg-light-900">
                      <SelectItem value="male">Electronic</SelectItem>
                      <SelectItem value="female">Non-Electronic</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Select your destination.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <FormField
            control={form.control}
            name="length"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Length <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Length in inches.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Width<span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Width in inches.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Height<span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Height in inches.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-5">
          <Button
            type="submit"
            className="bg-primary-500 w-fit !text-light-900 rounded-3xl px-10"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Estimating" : "Estimate"}
          </Button>
          <Button
            variant="outline"
            className="border-primary-500 w-fit hover:text-white hover:bg-primary-500 text-primary-500 rounded-3xl px-10"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Reset" : "Reset"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ShippingCalculatorForm;
