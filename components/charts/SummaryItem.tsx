"use client";
import React from "react";
import { PieChartProps } from "@/types";

import { Donut } from "./Donut";

const SummaryItem = ({ title, value, series, colors }: PieChartProps) => {
  return (
    <div className=" bg-light-800 flex flex-1 flex-col items-start justify-start rounded py-[13px] pl-8 text-left  shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] ">
      <div className="flex w-full flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="text-dark-500 relative truncate">{title}</div>

          <div className="text-dark300_light700 base-semibold relative">
            {value}
          </div>
        </div>
        <Donut series={series} colors={colors} labels={[`Goal`, title]} />
      </div>
    </div>
  );
};

export default SummaryItem;
