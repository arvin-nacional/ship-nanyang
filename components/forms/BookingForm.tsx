"use client";

import React, { useState, useTransition } from "react";
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
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BookingSchema } from "@/lib/validations";
import { createBooking } from "@/lib/actions/booking.action";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Calendar, Clock } from "lucide-react";

const SHIPPING_NEEDS = [
  "Air Freight",
  "Sea Freight (FCL)",
  "Sea Freight (LCL)",
  "Package Consolidation",
  "Warehouse Storage",
  "Customs Clearance",
  "E-commerce Fulfillment",
  "Other",
];

const TIME_SLOTS = [
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "01:00 PM - 02:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
];

const BookingForm = () => {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  // Minimum date = tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const form = useForm<z.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      shippingNeed: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof BookingSchema>) => {
    startTransition(async () => {
      const result = await createBooking({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        company: values.company || "",
        shippingNeed: values.shippingNeed || "",
        preferredDate: values.preferredDate,
        preferredTime: values.preferredTime,
        message: values.message || "",
      });

      if (result.success) {
        setSubmitted(true);
        form.reset();
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 px-6">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
          <CheckCircle2 size={36} className="text-green-600" />
        </div>
        <h3 className="h2-bold text-dark-500 mb-3">You&apos;re all set!</h3>
        <p className="paragraph-regular text-dark-400 max-w-md mb-6">
          Thanks for booking with us. Our team will reach out within{" "}
          <strong className="text-primary-500">24 hours</strong> to confirm your
          meeting and share the details.
        </p>
        <Button
          onClick={() => setSubmitted(false)}
          variant="outline"
          className="border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white"
        >
          Book another meeting
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-semibold text-dark-500">
                  First Name <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-2">
                  <Input
                    className="min-h-[52px] bg-white border border-gray-200 text-dark-400"
                    placeholder="John"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-semibold text-dark-500">
                  Last Name <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-2">
                  <Input
                    className="min-h-[52px] bg-white border border-gray-200 text-dark-400"
                    placeholder="Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-semibold text-dark-500">
                  Email <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-2">
                  <Input
                    type="email"
                    className="min-h-[52px] bg-white border border-gray-200 text-dark-400"
                    placeholder="john@company.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-semibold text-dark-500">
                  Phone <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-2">
                  <Input
                    className="min-h-[52px] bg-white border border-gray-200 text-dark-400"
                    placeholder="+852 1234 5678"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        {/* Company + Shipping Need */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-semibold text-dark-500">
                  Company{" "}
                  <span className="text-slate-400 text-sm font-normal">
                    (optional)
                  </span>
                </FormLabel>
                <FormControl className="mt-2">
                  <Input
                    className="min-h-[52px] bg-white border border-gray-200 text-dark-400"
                    placeholder="Your company name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shippingNeed"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-semibold text-dark-500">
                  What&apos;s your shipping need?
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="mt-2">
                    <SelectTrigger className="min-h-[52px] bg-white border border-gray-200 text-dark-400">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SHIPPING_NEEDS.map((need) => (
                      <SelectItem key={need} value={need}>
                        {need}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="preferredDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-semibold text-dark-500 flex items-center gap-2">
                  <Calendar size={16} className="text-primary-500" />
                  Preferred Date <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-2">
                  <Input
                    type="date"
                    min={minDate}
                    className="min-h-[52px] bg-white border border-gray-200 text-dark-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferredTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-semibold text-dark-500 flex items-center gap-2">
                  <Clock size={16} className="text-primary-500" />
                  Preferred Time <span className="text-primary-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="mt-2">
                    <SelectTrigger className="min-h-[52px] bg-white border border-gray-200 text-dark-400">
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark-500">
                Tell us about your shipping needs{" "}
                <span className="text-slate-400 text-sm font-normal">
                  (optional)
                </span>
              </FormLabel>
              <FormControl className="mt-2">
                <Textarea
                  className="min-h-[100px] bg-white border border-gray-200 text-dark-400 resize-none"
                  placeholder="Volume, origin/destination, timeline, etc."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-14 bg-primary-500 hover:bg-primary-400 text-white text-base font-semibold rounded-xl shadow-lg transition-all mt-2"
        >
          {isPending ? "Booking your meeting..." : "Book My Free Consultation"}
        </Button>

        <p className="text-xs text-slate-400 text-center -mt-2">
          We&apos;ll reach out within 24 hours to confirm your meeting. No spam,
          ever.
        </p>
      </form>
    </Form>
  );
};

export default BookingForm;
