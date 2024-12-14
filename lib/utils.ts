import qs from "query-string";
import { UrlQueryParams } from "@/app/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  totalFee: string;
  basicCharge: string;
  // surcharge: string;
  // handlingFee: number;
  chargeableWeight: string;
  insuranceFee: string;
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
  insurance,
}: {
  destination: string;
  value: string;
  weight: string;
  type: string;
  length: string;
  width: string;
  height: string;
  insurance: boolean;
}): Props => {
  // Parse inputs
  const parsedWeight = parseFloat(weight);
  const parsedValue = parseFloat(value);
  const parsedLength = parseFloat(length);
  const parsedWidth = parseFloat(width);
  const parsedHeight = parseFloat(height);

  const baseRateMetroManila = 0; // $ per lb
  const baseRateProvince = 80; // $ per lb
  // const handlingFee = 250; // $ per shipment
  // const electronicSurcharge = 200; // $ for electronic items
  // const highValueThreshold = 20000; // Threshold for high-value surcharge

  // Convert dimensions to cubic weight
  const cubicWeight = (parsedLength * parsedWidth * parsedHeight) / 6000;

  // Determine chargeable weight (greater of actual weight or cubic weight)
  const chargeableWeight = Math.max(parsedWeight, cubicWeight);

  // Determine the package type
  let packageTypeRate = 0;
  switch (type) {
    case "general":
      packageTypeRate = 320;
      break;
    case "sensitive":
      packageTypeRate = 450;
      break;
    case "special":
      packageTypeRate = 520;
      break;
    default:
      throw new Error("Invalid package type");
  }

  // Determine base rate based on destination
  const baseRate =
    destination === "Metro Manila" ? baseRateMetroManila : baseRateProvince;

  // Calculate base shipping fee
  const shippingFee = chargeableWeight * (baseRate + packageTypeRate);

  // add insurance fee if insurance is selected
  const insuranceFee = insurance ? parsedValue * 0.05 : 0;

  // Add surcharge for electronic items
  // let surcharge = type === "electronic" ? electronicSurcharge : 0;

  // Add insurance for high-value items (5% of value if $500 or more)
  // if (parsedValue >= highValueThreshold) {
  //   surcharge += parsedValue * 0.05;
  // }

  // Create result object
  const result = {
    totalFee: `${parseFloat(shippingFee.toFixed(2)) + parseFloat(insuranceFee.toFixed(2))} PHP`,
    basicCharge: `${parseFloat(shippingFee.toFixed(2)) + parseFloat(insuranceFee.toFixed(2))} PHP`,
    // surcharge: parseFloat(surcharge.toFixed(2)).toString(),
    // handlingFee: parseFloat(handlingFee.toFixed(2)),
    insuranceFee: `${parseFloat(insuranceFee.toFixed(2))} PHP`,
    chargeableWeight: `${chargeableWeight} Kg`,
  };

  return result;
};

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}
export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

export const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = date
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
