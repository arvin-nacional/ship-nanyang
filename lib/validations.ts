import { z } from "zod";

export const ShippingCalculatorFormSchema = z.object({
  destination: z.string().min(1, { message: "Please select a destination" }),
  value: z.string().min(1, { message: "Please enter a value" }),
  weight: z.string().min(1, { message: "Please enter a weight" }),
  type: z.string().min(1, { message: "Please select a type" }),
  length: z.string().min(1, { message: "Please enter a length" }),
  width: z.string().min(1, { message: "Please enter a width" }),
  height: z.string().min(1, { message: "Please enter a height" }),
  insurance: z.boolean().default(false),
});

export const ProfileSchema = z.object({
  // clerkId: z.string().min(1, { message: "Please enter a clerk ID" }),

  lastName: z.string().min(1, { message: "Please enter a last name" }),

  firstName: z.string().min(1, { message: "Please enter a first name" }),
  contactNumber: z
    .string()
    .min(1, { message: "Please enter a contact number" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  addressLine1: z.string().min(1, { message: "Please enter an address" }),
  addressLine2: z.string().min(1, { message: "Please enter an address" }),
  city: z.string().min(1, { message: "Please enter a city" }),
  province: z.string().min(1, { message: "Please enter a province" }),
  postalCode: z.string().min(1, { message: "Please enter a postal code" }),
  // country: z.string().min(1, { message: "Please enter a country" }),
  privacyPolicyAccepted: z.boolean(),
});
