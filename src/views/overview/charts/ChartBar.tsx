import { merge } from "lodash";
import BaseOptionChart from "./BaseOptionChart";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type ChartBarProps = {
  CHART_DATA: Array<any>; //  CHART_DATA = [{ data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] }];
  categories: Array<string>; // ["Italy", "Japan", "China"]
  height?: number;
};

export default function ChartBar({
  CHART_DATA,
  categories,
  height = 320,
}: ChartBarProps) {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { show: false },
    plotOptions: {
      bar: { horizontal: true, barHeight: "30%" },
    },
    xaxis: {
      categories: categories,
    },
  });

  return (
    <ReactApexChart
      type="bar"
      series={CHART_DATA}
      options={chartOptions}
      height={height}
    />
  );
}
