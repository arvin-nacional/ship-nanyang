import { z } from "zod";

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
  addressId: z.string().optional(),
});

export const AddressSchema = z.object({
  addressLine1: z.string().min(1, { message: "Please enter an address" }),
  addressLine2: z.string().min(1, { message: "Please enter an address" }),
  city: z.string().min(1, { message: "Please enter a city" }),
  province: z.string().min(1, { message: "Please enter a province" }),
  postalCode: z.string().min(1, { message: "Please enter a postal code" }),
  contactNumber: z
    .string()
    .min(1, { message: "Please enter a contact number" }),
  name: z.string().min(1, { message: "Please enter a name" }),
  isDefault: z.boolean(),
});
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
  vendor: z.string().min(1, { message: "Please select a vendor" }),
  trackingNumber: z
    .string()
    .min(1, { message: "Please enter a tracking number" }),
  value: z.string().min(1, { message: "Please enter an item value" }),
  description: z.string(),
  address: z.string().min(1, { message: "Please select an address" }),
  type: z.string().min(1, { message: "Please select a type" }),
  orderId: z.string().optional(),
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
