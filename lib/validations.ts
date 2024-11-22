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
