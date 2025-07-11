import React from "react";
import SummaryItem from "./SummaryItem";
import { summaryInfo } from "@/constants";
import { PieChartProps } from "@/types";

import Link from "next/link";
import { getUserCount } from "@/lib/actions/user.action";
import {
  getOrderCount,
  getOutForDeliveryOrderCount,
} from "@/lib/actions/order.action";
import { getPendingPackageCount } from "@/lib/actions/package.action";

const Summary = async () => {
  // Define maximum target values for visualization (total capacity)
  const maxValues: Record<string, number> = {
    "Total Users": 100,       // Maximum expected users
    "Shipping Carts": 500,    // Maximum expected carts
    "Pending Package": 50,    // Maximum expected pending packages
    "For Delivery": 50       // Maximum expected deliveries
  };
  
  // Clone the summary info to avoid modifying the imported constant directly
  const updatedSummaryInfo: Array<PieChartProps & { href: string }> = JSON.parse(JSON.stringify(summaryInfo));
  
  for (const item of updatedSummaryInfo) {
    // Fetch actual values
    if (item.title === "Total Users") {
      item.value = await getUserCount();
    }
    if (item.title === "Shipping Carts") {
      item.value = await getOrderCount();
    }
    if (item.title === "Pending Package") {
      item.value = await getPendingPackageCount();
    }
    if (item.title === "For Delivery") {
      item.value = await getOutForDeliveryOrderCount();
    }
    
    // Update the series data based on the fetched value
    const maxValue = maxValues[item.title] || 100;
    // Reverse the order so that the fetched value is displayed with the colored portion (second color)
    // First value is remaining capacity, second is the actual fetched value
    item.series = [maxValue - item.value, item.value]; // [remaining capacity, actual value]
  }

  return (
    <div className="flex flex-row flex-wrap gap-4 w-full">
      {updatedSummaryInfo.map((item) => (
        <Link href={item.href} key={item.title} className="max-sm:w-full">
          <SummaryItem
            title={item.title}
            value={item.value}
            series={item.series}
            colors={item.colors}
          />
        </Link>
      ))}
    </div>
  );
};

export default Summary;
