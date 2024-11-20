"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { calculateShippingFee } from "@/lib/utils";

const ShippingCalculatorForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calculationResults, setCalculationResults] = useState({
    chargeableWeight: "",
    basicCharge: "",
    surcharge: "",
    totalFee: "",
    handlingFee: 0,
  });

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

  const handleShippingCalculator = (
    data: z.infer<typeof ShippingCalculatorFormSchema>
  ) => {
    const result = calculateShippingFee(data);
    setCalculationResults({
      chargeableWeight: result.chargeableWeight,
      basicCharge: result.basicCharge,
      surcharge: result.surcharge,
      totalFee: result.totalFee,
      handlingFee: result.handlingFee,
    });
    window.scrollBy({ top: 500, behavior: "smooth" });
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.reset();

    setIsSubmitting(true);

    setCalculationResults({
      chargeableWeight: "",
      basicCharge: "",
      surcharge: "",
      totalFee: "",
      handlingFee: 0,
    });

    setIsSubmitting(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleShippingCalculator)}
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
          <div className="flex w-full flex-row gap-5">
            <div className="flex !w-[50%] flex-row gap-5">
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
                      Write the Actual Weight.
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="!w-[50%]">
                <FormField
                  control={form.control}
                  name="unit"
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
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="lb">lb</SelectItem>
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
                    Length in centimeters (cm).
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
                    Width in centimeters (cm).
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
                    Height in centimeters (cm).
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-5">
            <Button
              type="submit"
              className="w-fit rounded-3xl bg-primary-500 px-10 !text-light-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Estimating" : "Estimate"}
            </Button>
            <Button
              variant="outline"
              className="w-fit rounded-3xl border-primary-500 px-10 text-primary-500 hover:bg-primary-500 hover:text-white"
              disabled={isSubmitting}
              onClick={handleReset}
            >
              {isSubmitting ? "Reset" : "Reset"}
            </Button>
          </div>
        </form>
      </Form>

      {/* scroll here */}
      <div className="w-full  mx-auto mt-10">
        <div className="flex flex-row justify-between p-2 border-b-2 border-primary-500">
          <p className="base-semibold">Chargable Weight</p>{" "}
          <p>{calculationResults.chargeableWeight}</p>
        </div>
        <div className="flex flex-row justify-between p-2 border-b-2 border-primary-500">
          <p className="base-semibold">Basic Charge</p>{" "}
          <p>{calculationResults.basicCharge}</p>
        </div>
        <div className="flex flex-row justify-between p-2 border-b-2 border-primary-500 mb-2">
          <p className="base-semibold">Surcharge</p>{" "}
          <p>{calculationResults.surcharge}</p>
        </div>
        <div className="flex flex-row justify-between p-2 text-white bg-primary-500 rounded-lg">
          <p className="base-semibold">Total Estimated Cost</p>{" "}
          <p>{calculationResults.totalFee}</p>
        </div>
      </div>
    </>
  );
};

export default ShippingCalculatorForm;
