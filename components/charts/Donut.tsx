"use client";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  series: Array<number>;
  colors: Array<string>;
  labels?: Array<string>;
}
export function Donut({ series, colors, labels }: Props) {
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
          tooltip: {
            y: {
              formatter: (value, { seriesIndex }) => {
                return labels && labels[seriesIndex] 
                  ? `${value}` 
                  : `${value}`;
              }
            }
          },
          labels: labels || [],
        }}
        series={series}
        type="donut"
        height={80}
        width={80}
      />
    </>
  );
}
