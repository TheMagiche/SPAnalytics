import { merge } from "lodash";
import BaseOptionChart from "./BaseOptionChart";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type ChartLineProps = {
  CHART_DATA: Array<any>; //  CHART_DATA = [{ name: 'Desktops', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] }];
  categories: Array<string>; // ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
  height?: number;
};

export default function ChartLine({
  CHART_DATA,
  categories,
  height = 320,
}: ChartLineProps) {
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: categories,
    },
    tooltip: { x: { show: false }, marker: { show: false } },
  });

  return (
    <ReactApexChart
      type="line"
      series={CHART_DATA}
      options={chartOptions}
      height={height}
    />
  );
}
