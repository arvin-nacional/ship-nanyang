"use client";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  series: Array<number>;
  colors: Array<string>;
}
export function Donut({ series, colors }: Props) {
  return (
    <>
      <Chart
        options={{
          chart: {
            type: "donut",
          },
          legend: { show: false },
          dataLabels: { enabled: false },
          colors,
        }}
        series={series}
        type="donut"
        height={80}
        width={80}
      />
    </>
  );
}
