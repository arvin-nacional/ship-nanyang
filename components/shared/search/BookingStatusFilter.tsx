"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

interface Props {
  route: string;
}

const STATUSES = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Scheduled", value: "scheduled" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const BookingStatusFilter = ({ route: _route }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("filter") || "all";

  const handleClick = (value: string) => {
    if (value === "all") {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter", "page"],
      });
      router.push(newUrl, { scroll: false });
    } else {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value,
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {STATUSES.map((s) => (
        <button
          key={s.value}
          onClick={() => handleClick(s.value)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            active === s.value
              ? "bg-primary-500 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
};

export default BookingStatusFilter;
