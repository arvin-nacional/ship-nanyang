"use client";
import React, { useState, ChangeEvent, useRef } from "react";
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
import { Checkbox } from "../ui/checkbox";

const ShippingCalculatorForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calculationResults, setCalculationResults] = useState({
    chargeableWeight: "",
    basicCharge: "",
    // surcharge: "",
    totalFee: "",
    insurance: "",
  });
  
  // Reference to the total estimated cost section
  const totalCostSectionRef = useRef<HTMLDivElement>(null);

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
      insurance: false,
    },
  });

  const handleShippingCalculator = (
    data: z.infer<typeof ShippingCalculatorFormSchema>
  ) => {
    // Pass string values to calculateShippingFee which will parse them
    const result = calculateShippingFee({
      ...data,
      value: data.value,
      weight: data.weight,
      length: data.length,
      width: data.width,
      height: data.height
    });
    setCalculationResults({
      chargeableWeight: result.chargeableWeight,
      basicCharge: result.basicCharge,
      totalFee: result.totalFee,
      insurance: result.insuranceFee,
    });
    
    // Scroll to the total estimated cost section
    setTimeout(() => {
      totalCostSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }, 100); // Small delay to ensure the DOM has updated
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    window.location.reload();

    setIsSubmitting(true);

    setCalculationResults({
      chargeableWeight: "",
      basicCharge: "",
      totalFee: "",
      insurance: "",
    });

    setIsSubmitting(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleShippingCalculator)}
          className="flex w-full flex-col gap-5"
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
                        <SelectValue placeholder="Select Destination" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="cursor-pointer bg-light-900">
                      <SelectItem value="Metro Manila">Metro Manila</SelectItem>
                      <SelectItem value="Provincial">
                        Provincial Address
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                    Select your destination.
                  </FormDescription> */}
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => {
                const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
                  // Allow only numeric values and decimal points
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  // Prevent multiple decimal points
                  if (value.split('.').length > 2) {
                    return;
                  }
                  field.onChange(value);
                };
                
                return (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                      Value (PHP)<span className="text-primary-500">*</span>
                    </FormLabel>
                    <FormControl className="mt-3.5">
                      <Input
                        className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                        placeholder="Write the value of the package in Peso."
                        value={field.value}
                        onChange={handleChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        inputMode="decimal"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="flex w-full flex-row gap-5">
            <div className="flex !w-[50%] flex-row gap-5">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => {
                  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
                    // Allow only numeric values and decimal points
                    const value = e.target.value.replace(/[^0-9.]/g, '');
                    // Prevent multiple decimal points
                    if (value.split('.').length > 2) {
                      return;
                    }
                    field.onChange(value);
                  };
                  
                  return (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="paragraph-semibold text-dark400_light800">
                        Weight (kg)<span className="text-primary-500">*</span>
                      </FormLabel>
                      <FormControl className="mt-3.5">
                        <Input
                          className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                          placeholder="Write the Actual Weight in Kg."
                          value={field.value}
                          onChange={handleChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          inputMode="decimal"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="w-[50%]">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col ">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                      Package Type <span className="text-primary-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                          <SelectValue placeholder="Select Package Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="hover:cursor-pointer cursor-pointer bg-light-900">
                        <SelectItem value="general" className="cursor-pointer focus:bg-light-700 dark:focus:bg-dark-400">General Goods</SelectItem>
                        <SelectItem value="sensitive" className="cursor-pointer focus:bg-light-700 dark:focus:bg-dark-400">Sensitive Goods</SelectItem>
                        <SelectItem value="special" className="cursor-pointer focus:bg-light-700 dark:focus:bg-dark-400">Special Goods</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                      Select your package type.
                    </FormDescription> */}
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
              render={({ field }) => {
                const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
                  // Allow only numeric values and decimal points
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  // Prevent multiple decimal points
                  if (value.split('.').length > 2) {
                    return;
                  }
                  field.onChange(value);
                };
                
                return (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                      Length (cm)<span className="text-primary-500">*</span>
                    </FormLabel>
                    <FormControl className="mt-3.5">
                      <Input
                        className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                        placeholder="Length in centimeters (cm)."
                        value={field.value}
                        onChange={handleChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        inputMode="decimal"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => {
                const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
                  // Allow only numeric values and decimal points
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  // Prevent multiple decimal points
                  if (value.split('.').length > 2) {
                    return;
                  }
                  field.onChange(value);
                };
                
                return (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                      Width (cm)<span className="text-primary-500">*</span>
                    </FormLabel>
                    <FormControl className="mt-3.5">
                      <Input
                        className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                        placeholder="Width in centimeters (cm)."
                        value={field.value}
                        onChange={handleChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        inputMode="decimal"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => {
                const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
                  // Allow only numeric values and decimal points
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  // Prevent multiple decimal points
                  if (value.split('.').length > 2) {
                    return;
                  }
                  field.onChange(value);
                };
                
                return (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                      Height (cm)<span className="text-primary-500">*</span>
                    </FormLabel>
                    <FormControl className="mt-3.5">
                      <Input
                        className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                        placeholder="Height in centimeters (cm)."
                        value={field.value}
                        onChange={handleChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        inputMode="decimal"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                );
              }}
            />
          </div>
          <FormField
            control={form.control}
            name="insurance"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md ">
                <FormControl className="border border-primary-500">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Insurance (Optional)</FormLabel>
                  <FormDescription>
                    The insurance covers damages or loss during transit and adds
                    5% of the package&apos;s declared value to the total cost.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-5">
            <Button
              type="submit"
              className="w-fit rounded-3xl bg-primary-500 hover:bg-primary-400 px-10 !text-light-900"
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
        {/* <div className="flex flex-row justify-between p-2 border-b-2 border-primary-500">
          <p className="base-semibold">Chargable Weight</p>{" "}
          <p>{calculationResults.chargeableWeight}</p>
        </div> */}
        <div className="flex flex-row justify-between p-2 border-b-2 border-primary-500">
          <p className="base-semibold">Basic Charge</p>{" "}
          <p>{calculationResults.basicCharge}</p>
        </div>
        <div className="flex flex-row justify-between p-2 border-b-2 border-primary-500 mb-2">
          <p className="base-semibold">Insurance</p>{" "}
          <p>{calculationResults.insurance}</p>
        </div>
        <div 
          
          className="flex flex-row justify-between p-2 text-white bg-primary-500 rounded-lg"
        >
          <p className="base-semibold">Total Estimated Cost</p>{" "}
          <p>{calculationResults.totalFee}</p>
        </div>
      </div>

      <div ref={totalCostSectionRef}>
        <p className="paragraph-regular mt-5">
          Prices are quoted per kilogram. The weight calculation is based on the
          greater of actual weight or volumetric weight (length x width x
          height/6000). Any additional add-on wooden crate or repackaging will
          be subjected to charges.
        </p>
      </div>
    </>
  );
};

export default ShippingCalculatorForm;
