"use client";

import { useFormContext } from "react-hook-form";
import { countries, philippineProvinces } from "@/constants/countries";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface AddressValues {
  country: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  postalCode: string;
}

const inputClass = "no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] w-full rounded-md border px-3";

export default function InternationalAddressFields() {
  const form = useFormContext<AddressValues>();
  const isPhilippines = form.watch("country") === "PH";
  const fields = [
    { name: "addressLine1", label: "Street address", required: true, autoComplete: "address-line1" },
    { name: "addressLine2", label: "Apartment, building, additional details (optional)", required: false, autoComplete: "address-line2" },
    { name: "city", label: "City / locality", required: true, autoComplete: "address-level2" },
    { name: "province", label: isPhilippines ? "Province" : "State / province / region (if applicable)", required: isPhilippines, autoComplete: "address-level1" },
    { name: "postalCode", label: isPhilippines ? "Postal code" : "Postal / ZIP code (if applicable)", required: isPhilippines, autoComplete: "postal-code" },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <FormField control={form.control} name="country" render={({ field }) => (
        <FormItem className="flex flex-col sm:col-span-2">
          <FormLabel>Country / region <span className="text-primary-500">*</span></FormLabel>
          <FormControl>
            <select {...field} autoComplete="country" className={inputClass} onChange={(event) => {
              field.onChange(event);
              form.setValue("province", "", { shouldDirty: true });
              form.setValue("postalCode", "", { shouldDirty: true });
              form.clearErrors(["province", "postalCode"]);
            }}>
              <option value="" disabled>Select your country / region</option>
              {countries.map(({ code, name }) => <option key={code} value={code}>{name}</option>)}
            </select>
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )} />
      {fields.map(({ name, label, required, autoComplete }) => (
        <FormField key={name} control={form.control} name={name} render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>{label} {required && <span className="text-primary-500">*</span>}</FormLabel>
            <FormControl>
              {name === "province" && isPhilippines ? (
                <select {...field} autoComplete={autoComplete} className={inputClass}>
                  <option value="" disabled>Select a province</option>
                  {philippineProvinces.map((province) => <option key={province} value={province}>{province}</option>)}
                </select>
              ) : <Input {...field} autoComplete={autoComplete} className={inputClass} />}
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )} />
      ))}
    </div>
  );
}
