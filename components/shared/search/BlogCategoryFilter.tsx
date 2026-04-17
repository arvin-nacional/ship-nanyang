"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

interface Props {
  categories: string[];
}

const BlogCategoryFilter = ({ categories }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("filter") || "all";

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
      <button
        onClick={() => handleClick("all")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          activeFilter === "all"
            ? "bg-primary-500 text-white shadow-sm"
            : "bg-white border border-gray-200 text-slate-600 hover:border-primary-500 hover:text-primary-500"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === cat
              ? "bg-primary-500 text-white shadow-sm"
              : "bg-white border border-gray-200 text-slate-600 hover:border-primary-500 hover:text-primary-500"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default BlogCategoryFilter;
