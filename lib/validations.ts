import { z } from "zod";
import { countryCodes } from "@/constants/countries";

const internationalAddressFields = {
  country: z.string().refine((code) => countryCodes.includes(code), { message: "Please select a country / region" }),
  addressLine1: z.string().trim().min(1, "Please enter a street address"),
  addressLine2: z.string().trim(),
  city: z.string().trim().min(1, "Please enter a city / locality"),
  province: z.string().trim(),
  postalCode: z.string().trim(),
};

function validateAddressRegion(
  address: { country: string; province: string; postalCode: string },
  context: z.RefinementCtx
) {
  if (address.country === "PH") {
    if (!address.province) context.addIssue({ code: z.ZodIssueCode.custom, path: ["province"], message: "Please select a province" });
    if (!address.postalCode) context.addIssue({ code: z.ZodIssueCode.custom, path: ["postalCode"], message: "Please enter a postal code" });
  }
}


export const ShippingCalculatorFormSchema = z.object({
  destination: z.string().min(1, { message: "Please select a destination" }),
  value: z.string()
    .min(1, { message: "Please enter a value" })
    .regex(/^\d+(\.\d+)?$/, { message: "Value must be a valid number" }),
  weight: z.string()
    .min(1, { message: "Please enter a weight" })
    .regex(/^\d+(\.\d+)?$/, { message: "Weight must be a valid number" }),
  type: z.string().min(1, { message: "Please select a type" }),
  length: z.string()
    .min(1, { message: "Please enter a length" })
    .regex(/^\d+(\.\d+)?$/, { message: "Length must be a valid number" }),
  width: z.string()
    .min(1, { message: "Please enter a width" })
    .regex(/^\d+(\.\d+)?$/, { message: "Width must be a valid number" }),
  height: z.string()
    .min(1, { message: "Please enter a height" })
    .regex(/^\d+(\.\d+)?$/, { message: "Height must be a valid number" }),
  insurance: z.boolean().default(false),
});

export const ProfileSchema = z.object({
  ...internationalAddressFields,
  lastName: z.string().trim().min(1, "Please enter a last name"),
  firstName: z.string().trim().min(1, "Please enter a first name"),
  contactNumber: z.string().trim().min(1, "Please enter a contact number"),
  email: z.string().email("Please enter a valid email address"),
  privacyPolicyAccepted: z.boolean().refine((accepted) => accepted, {
    message: "Please accept the Privacy Policy to continue",
  }),
  addressId: z.string().optional(),
}).superRefine(validateAddressRegion);

export const AddressSchema = z.object({
  ...internationalAddressFields,
  contactNumber: z.string().trim().min(1, "Please enter a contact number"),
  name: z.string().trim().min(1, "Please enter a name"),
  isDefault: z.boolean(),
}).superRefine(validateAddressRegion);
export const ImageSchema = z.object({
  src: z.string().url(),
  alt: z.string().min(1, { message: "Please enter an alt text" }),
  _id: z.string().min(1).max(30),
});

export const PaymentSchema = z.object({
  images: z.array(
    z.object({
      src: z.string().url(),
      alt: z.string().min(1),
      _id: z.string().min(1).max(30),
    })
  ),
});

export const CreateOrderSchema = z.object({
  vendor: z.string().trim().min(1, "Please enter a vendor"),
  trackingNumber: z.string().trim().min(1, "Please enter a tracking number"),
  value: z.string().trim().min(1, "Please enter an item value")
    .refine((value) => /^\d+(\.\d+)?$/.test(value) && Number.isFinite(Number(value)), "Please enter a valid non-negative item value"),
  description: z.string().trim().min(1, "Please enter an item description"),
  address: z.string().default(""),
  type: z.enum(["singleOrder", "consolidation"], { message: "Please select an order type" }),
  orderId: z.string().optional(),
}).superRefine((data, context) => {
  const field = data.type === "singleOrder" ? "address" : "orderId";
  if (!/^[a-f\d]{24}$/i.test(data[field] || "")) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: [field],
      message: field === "address" ? "Please select an address" : "Please select a cart" });
  }
});

export const UpdateOrderSchema = z.object({
  status: z.string().min(1, { message: "Please select a status" }),
  paymentStatus: z
    .string()
    .min(1, { message: "Please select a payment status" }),
  finalAmount: z.string(),
  insurance: z.string(),
  miscellaneousFee: z.string(),
  localDeliveryFee: z.string(),
  discount: z.string(),
  airwayBillNumber: z.string(),
});

export const UpdatePackageSchema = z.object({
  vendor: z.string().min(1, { message: "Please select a vendor" }),
  trackingNumber: z
    .string()
    .min(1, { message: "Please enter a tracking number" }),
  value: z.string().min(1, { message: "Please enter an item value" }),
  description: z.string(),
  shipmentPrice: z.string(),
  status: z.string().min(1, { message: "Please select a status" }),
});

export const BlogSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  content: z.string().min(10, { message: "Content must be at least 10 characters" }),
  excerpt: z.string().max(300, { message: "Excerpt must be under 300 characters" }).optional().or(z.literal("")),
  category: z.string().min(1, { message: "Please select a category" }),
  tags: z.string().optional(),
  coverImage: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  coverImagePosition: z.string().optional(),
  author: z.string().min(1, { message: "Please enter an author name" }),
  status: z.enum(["draft", "published"]),
});

export const RequestQuoteFormSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, { message: "Please enter your first name" }),
  lastName: z.string().min(1, { message: "Please enter your last name" }),
  companyName: z.string().min(1, { message: "Please enter your company name" }),
  position: z.string().min(1, { message: "Please enter your position" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  contactNumber: z.string().min(1, { message: "Please enter your contact number" }),
  
  // Cargo Information
  incoterms: z.string().min(1, { message: "Please select INCOTERMS" }),
  cargoDescription: z.string().min(1, { message: "Please enter cargo description" }),
  expectedShippingDate: z.string().min(1, { message: "Please select expected shipping date" }),
  cityPortOrigin: z.string().min(1, { message: "Please enter city/port of origin" }),
  destination: z.string().min(1, { message: "Please enter destination" }),
  shipmentType: z.string().min(1, { message: "Please select shipment type" }),
  
  // Files (optional)
  files: z.array(z.any()).optional(),
  
  // Comments/Questions (optional)
  comments: z.string().optional(),
});
