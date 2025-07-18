"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema } from "@/lib/validations";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "@/lib/actions/address.action";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Trash2 } from "lucide-react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Props {
  type?: string;
  addressDetails?: string;
  addressId?: string;
  admin?: boolean;
}

// List of all provinces in the Philippines
const philippineProvinces = [
  "Abra", "Agusan del Norte", "Agusan del Sur", "Aklan", "Albay", "Antique", "Apayao", "Aurora", 
  "Basilan", "Bataan", "Batanes", "Batangas", "Benguet", "Biliran", "Bohol", "Bukidnon", "Bulacan", 
  "Cagayan", "Camarines Norte", "Camarines Sur", "Camiguin", "Capiz", "Catanduanes", "Cavite", "Cebu", 
  "Cotabato", "Davao de Oro", "Davao del Norte", "Davao del Sur", "Davao Occidental", "Davao Oriental", 
  "Dinagat Islands", "Eastern Samar", "Guimaras", "Ifugao", "Ilocos Norte", "Ilocos Sur", "Iloilo", 
  "Isabela", "Kalinga", "La Union", "Laguna", "Lanao del Norte", "Lanao del Sur", "Leyte", 
  "Maguindanao del Norte", "Maguindanao del Sur", "Marinduque", "Masbate", "Metro Manila", "Misamis Occidental", 
  "Misamis Oriental", "Mountain Province", "Negros Occidental", "Negros Oriental", "Northern Samar", 
  "Nueva Ecija", "Nueva Vizcaya", "Occidental Mindoro", "Oriental Mindoro", "Palawan", "Pampanga", 
  "Pangasinan", "Quezon", "Quirino", "Rizal", "Romblon", "Samar", "Sarangani", "Siquijor", "Sorsogon", 
  "South Cotabato", "Southern Leyte", "Sultan Kudarat", "Sulu", "Surigao del Norte", "Surigao del Sur", 
  "Tarlac", "Tawi-Tawi", "Zambales", "Zamboanga del Norte", "Zamboanga del Sur", "Zamboanga Sibugay"
];

const Address = ({ type, addressDetails, addressId, admin }: Props) => {
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
 

  const parsedAddressDetails = JSON.parse(addressDetails || "{}");

  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      addressLine1: parsedAddressDetails?.addressLine1 || "",
      addressLine2: parsedAddressDetails?.addressLine2 || "",
      city: parsedAddressDetails?.city || "",
      province: parsedAddressDetails?.province || "",
      postalCode: parsedAddressDetails?.postalCode || "",
      contactNumber: parsedAddressDetails?.contactNumber || "",
      name: parsedAddressDetails?.name || "",
      isDefault: parsedAddressDetails?.isDefault || false,
    },
  });

  async function onSubmit(data: z.infer<typeof AddressSchema>) {
    startTransition(async () => {
      try {
        if (type === "create") {
          await createAddress({
            clerkId: user?.id ?? "",
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            city: data.city,
            province: data.province,
            postalCode: data.postalCode,
            contactNumber: data.contactNumber,
            name: data.name,
            path: pathname,
            isDefault: data.isDefault,
          });

          if (admin) {
            router.push("/admin/receiver");
          } else router.push("/user/address");
        } else {
          await updateAddress(addressId ?? "", {
            clerkId: user?.id ?? "",
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            city: data.city,
            province: data.province,
            postalCode: data.postalCode,
            contactNumber: data.contactNumber,
            name: data.name,
            isDefault: data.isDefault,
          });
          console.log(data.isDefault);

          if (admin) {
            router.push("/admin/receiver");
          } else router.push("/user/address");
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteAddress(addressId ?? "");
        router.push("/user/address");
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      {type === "create" ? (
        admin ? (
          <p className="h2-bold mb-5">Add Receiver</p>
        ) : (
          <p className="h2-bold mb-5">Add a Package</p>
        )
      ) : (
        <div className="flex justify-between">
          <p className="h2-bold mb-5">Edit Address</p>

          {parsedAddressDetails?.isDefault === false  || admin == true  ? (
            <Button className="border border-gray-600 hover:border-primary-500 hover:bg-primary-500 hover:text-white" onClick={handleDelete}>
              <Trash2 />
              Delete Address
            </Button>
          ) : null}
        </div>
      )}

      {/* <div className="flex items-center space-x-2 mb-5">
        <Switch
          id="airplane-mode"
          checked={isDefaultAddress}
          disabled={isDefaultAddress}
          onClick={handleSetDefaultAddress}
        />
        <Label htmlFor="airplane-mode">
          {isDefaultAddress ? "Default Address" : "Set as Default Address"}
        </Label>
      </div> */}

      <Form {...form}>
        <form
          className="flex w-full flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-row gap-5 max-sm:flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Recipient Name <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                      placeholder="Enter Recipient Name"
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
              name="contactNumber"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Contact Number<span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                      placeholder="Enter contact number"
                    />
                  </FormControl>
                  {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Create a title for your post.
              </FormDescription> */}
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-5 max-sm:flex-col">
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Address Line 1 <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                      placeholder="Enter address line 1"
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
              name="addressLine2"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Address Line 2 <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                      placeholder="Enter address line 2"
                    />
                  </FormControl>
                  {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Create a title for your post.
              </FormDescription> */}
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-5 max-sm:flex-col">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    City <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                      placeholder="Enter City Name"
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
            name="province"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Province<span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                      <SelectValue placeholder="Select a province" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] overflow-y-auto background-light900_dark300">
                      {philippineProvinces.map((province) => (
                        <SelectItem key={province} value={province} className="cursor-pointer focus:bg-light-700 dark:focus:bg-dark-400">
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          </div>
          <div className="flex flex-row gap-5 max-sm:flex-col">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Postal Code <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                      placeholder="Enter postal code"
                    />
                  </FormControl>
                  {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Create a title for your post.
              </FormDescription> */}
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="w-full"></div>
          </div>
          {parsedAddressDetails?.isDefault !== false ||
            (!admin && (
              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    {/* <FormLabel className="paragraph-semibold text-dark400_light800">
                  Postal Code <span className="text-primary-500">*</span>
                </FormLabel> */}
                    <FormControl className="mt-3.5">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                          className="data-[state=checked]:bg-primary-500 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600"
                        />
                        <Label 
                          htmlFor="default-address"
                          className={`${field.value ? 'text-primary-500 font-semibold' : 'text-gray-500'}`}
                        >
                          Set as Default Address
                          {field.value && ' ✓'}
                        </Label>
                      </div>
                    </FormControl>
                    {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Create a title for your post.
              </FormDescription> */}
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            ))}

          <Button
            type="submit"
            className="w-fit rounded-3xl bg-primary-500 px-10 !text-light-900 mt-2"
            disabled={isPending}
          >
            {isPending ? "Saving" : "Save"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Address;
