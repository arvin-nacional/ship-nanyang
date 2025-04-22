import React from "react";
import SummaryItem from "./SummaryItem";
import { summaryInfo } from "@/constants";

import Link from "next/link";
import { getUserCount } from "@/lib/actions/user.action";
import {
  getOrderCount,
  getOutForDeliveryOrderCount,
} from "@/lib/actions/order.action";
import { getPendingPackageCount } from "@/lib/actions/package.action";

const Summary = async () => {
  for (const item of summaryInfo) {
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
  }

  return (
    <div className="flex flex-row flex-wrap gap-4 w-full">
      {summaryInfo.map((item) => (
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
