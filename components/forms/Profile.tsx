"use client";

import InternationalAddressFields from "./InternationalAddressFields";

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
import Link from "next/link";

interface Props {
  type?: string;
  profileDetails?: string;
}


const Profile = ({ type, profileDetails }: Props) => {
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  const router = useRouter();

  const parsedProfileDetails = JSON.parse(profileDetails || "{}");

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
      country: parsedProfileDetails?.address?.country || (parsedProfileDetails?.address ? "PH" : ""),
      privacyPolicyAccepted:
        parsedProfileDetails.privacyPolicyAccepted || false,
      // clerkId: parsedProfileDetails?.clerkId,
    },
  });

  async function onSubmit(data: z.infer<typeof ProfileSchema>) {
    form.clearErrors("root");
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
          country: data.country,
          privacyPolicyAccepted: data.privacyPolicyAccepted,
          addressId: parsedProfileDetails?.address?._id,
          path: pathname,
          formType: type,
        });
        if (type === "Edit") {
          router.replace("/user/profile");
        } else if (type === "Create") {
          router.replace("/user/dashboard");
        }
        router.refresh();
      } catch (error) {
        console.error("Unable to save profile:", error);
        form.setError("root", {
          message: "We couldn't save your profile. Please try again. Your entries are still here.",
        });
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
                  Phone number (include country code) <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                      type="tel"
                      autoComplete="tel"
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
        <InternationalAddressFields />
        {(type === "Create" || !parsedProfileDetails.privacyPolicyAccepted) && (
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
                  <FormLabel><Link href="/privacy-policy" target="_blank" className="text-blue-500 underline">Privacy Policy</Link></FormLabel>
                  <FormDescription>
                    By checking this box, you agree to our Privacy Policy, which
                    outlines how we collect, use, and protect your personal
                    information.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </div>
              </FormItem>
            )}
          />
        )}

        {form.formState.errors.root && (
          <p role="alert" className="text-red-500">
            {form.formState.errors.root.message}
          </p>
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
