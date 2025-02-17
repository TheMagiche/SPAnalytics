import { merge } from "lodash";
import BaseOptionChart from "./BaseOptionChart";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// ----------------------------------------------------------------------

// const CHART_DATA = [
//   { name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
//   { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] }
// ];

type ChartColumnMultipleProps = {
  CHART_DATA: Array<any>;
  categories: Array<string>;
  formatter?: any;
  height?: number;
};

export default function ChartColumnMultiple({
  CHART_DATA,
  categories,
  formatter = (val: number) => `$ ${val} thousands`,
  height = 320
}: ChartColumnMultipleProps) {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      // categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
      categories: categories,
    },
    tooltip: {
      y: {
        formatter,
      },
    },
    plotOptions: { bar: { columnWidth: "36%" } },
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
