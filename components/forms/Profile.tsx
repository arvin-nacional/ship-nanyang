"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "@/lib/validations";
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
import { usePathname, useRouter } from "next/navigation";

interface Props {
  type?: string;
  profileDetails?: string;
}

const Profile = ({ type, profileDetails }: Props) => {
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  const router = useRouter();

  const parsedProfileDetails = JSON.parse(profileDetails || "");

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      lastName: parsedProfileDetails?.lastName || "",
      firstName: parsedProfileDetails?.firstName || "",
      contactNumber: parsedProfileDetails?.address?.contactNumber || "",
      email: parsedProfileDetails?.email || "",
      addressLine1: parsedProfileDetails?.address?.addressLine1 || "",
      addressLine2: parsedProfileDetails?.address?.addressLine2 || "",
      city: parsedProfileDetails?.address?.city || "",
      province: parsedProfileDetails?.address?.province || "",
      postalCode: parsedProfileDetails?.address?.postalCode || "",
      // country: parsedProfileDetails?.country || "",
      privacyPolicyAccepted:
        parsedProfileDetails.privacyPolicyAccepted || false,
      // clerkId: parsedProfileDetails?.clerkId,
    },
  });

  async function onSubmit(data: z.infer<typeof ProfileSchema>) {
    startTransition(async () => {
      try {
        await updateUser({
          clerkId: parsedProfileDetails?.clerkId,
          firstName: data.firstName,
          lastName: data.lastName,
          contactNumber: data.contactNumber,
          email: data.email,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          city: data.city,
          province: data.province,
          postalCode: data.postalCode,
          privacyPolicyAccepted: data.privacyPolicyAccepted,
          addressId: parsedProfileDetails?.address?._id,
          path: pathname,
        });
        if (type === "Edit") {
          router.push("/user/profile");
        } else if (type === "Create") {
          router.push("/user/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-5"
      >
        <div className="flex flex-row gap-5 max-sm:flex-col">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  First Name <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field}
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
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Last Name <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field}
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
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Email Address <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field}
                    disabled
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
                  Contact Number <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field}
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
                  />
                </FormControl>
                {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter the first line of your address.
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
                  />
                </FormControl>
                {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter the second line for your address.
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
                  />
                </FormControl>
                {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter the city for your address.
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
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field}
                    placeholder="Metro Manila or other Provinces"
                  />
                </FormControl>
                {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter the province for your address.
              </FormDescription> */}
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
                  Postal Code<span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter the postal code for your address.
              </FormDescription> */}
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="w-full"></div>
        </div>

        {type === "Create" && (
          <FormField
            control={form.control}
            name="privacyPolicyAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md ">
                <FormControl className="border border-primary-500">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Privacy Policy</FormLabel>
                  <FormDescription>
                    By checking this box, you agree to our Privacy Policy, which
                    outlines how we collect, use, and protect your personal
                    information.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          className="bg-primary-500 hover:bg-primary-400 w-fit !text-light-900"
          disabled={!form.watch("privacyPolicyAccepted") || isPending}
        >
          {isPending ? (
            <>{type === "Edit" ? "Saving..." : "Submitting"}</>
          ) : (
            <>{type === "Edit" ? "Save" : "Submit"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Profile;
