"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

interface Props {
  route: string;
  categories: string[];
}

const AdminBlogFilter = ({ route, categories }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeFilter = searchParams.get("filter") || "all";
  const activeStatus = searchParams.get("status") || "";

  const handleCategoryClick = (value: string) => {
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

  const handleStatusClick = (value: string) => {
    if (value === "") {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["status", "page"],
      });
      router.push(newUrl, { scroll: false });
    } else {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "status",
        value,
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* Category filters */}
      <button
        onClick={() => handleCategoryClick("all")}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          activeFilter === "all"
            ? "bg-primary-500 text-white"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryClick(cat)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeFilter === cat
              ? "bg-primary-500 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {cat}
        </button>
      ))}

      {/* Status divider */}
      <span className="self-center text-slate-300">|</span>

      {/* Status filters */}
      {[
        { label: "All Status", value: "" },
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
      ].map((s) => (
        <button
          key={s.label}
          onClick={() => handleStatusClick(s.value)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeStatus === s.value
              ? "bg-dark-400 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
};

export default AdminBlogFilter;
