import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  totalFee: string;
  basicCharge: string;
  surcharge: string;
  handlingFee: number;
  chargeableWeight: string;
}

// Function to calculate the shipping fee
export const calculateShippingFee = ({
  destination,
  value,
  weight,
  type,
  length,
  width,
  height,
  unit,
}: {
  destination: string;
  value: string;
  weight: string;
  type: string;
  length: string;
  width: string;
  height: string;
  unit: string;
}): Props => {
  const baseRateMetroManila = 320; // $ per lb
  const baseRateProvince = 350; // $ per lb
  const handlingFee = 250; // $ per shipment
  const electronicSurcharge = 200; // $ for electronic items
  const highValueThreshold = 20000; // Threshold for high-value surcharge

  // Parse inputs
  const parsedWeight = parseFloat(weight);
  const parsedValue = parseFloat(value);
  const parsedLength = parseFloat(length);
  const parsedWidth = parseFloat(width);
  const parsedHeight = parseFloat(height);

  // Convert dimensions to cubic weight
  const cubicWeight =
    unit === "kg"
      ? (parsedLength * parsedWidth * parsedHeight) / 5000 // cubic weight in kg
      : (parsedLength * parsedWidth * parsedHeight) / 166; // cubic weight in lbs

  // Determine chargeable weight (greater of actual weight or cubic weight)
  const chargeableWeight = Math.max(parsedWeight, cubicWeight);

  // Determine base rate based on destination
  const baseRate =
    destination === "Metro Manila" ? baseRateMetroManila : baseRateProvince;

  // Calculate base shipping fee
  const shippingFee = chargeableWeight * baseRate;

  // Add surcharge for electronic items
  let surcharge = type === "electronic" ? electronicSurcharge : 0;

  // Add insurance for high-value items (5% of value if $500 or more)
  if (parsedValue >= highValueThreshold) {
    surcharge += parsedValue * 0.05;
  }

  // Create result object
  const result = {
    totalFee: `${parseFloat((shippingFee + surcharge + handlingFee).toFixed(2))} PHP`,
    basicCharge: `${parseFloat(shippingFee.toFixed(2)) + handlingFee} PHP`,
    surcharge: parseFloat(surcharge.toFixed(2)).toString(),
    handlingFee: parseFloat(handlingFee.toFixed(2)),
    chargeableWeight: `${chargeableWeight} ${unit}`,
  };

  return result;
};
