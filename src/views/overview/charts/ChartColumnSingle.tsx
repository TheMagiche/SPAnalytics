import { merge } from "lodash";
import BaseOptionChart from "./BaseOptionChart";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type ChartColumnSingleProps = {
  CHART_DATA: Array<any>; // CHART_DATA = [{ name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] }];
  categories: Array<string>; // ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
  formatter?: any;
  height?: number;
};

export default function ChartColumnSingle({
  CHART_DATA,
  categories,
  formatter = (val: number) => `$ ${val} thousands`,
  height = 320,
}: ChartColumnSingleProps) {
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: "16%" } },
    stroke: { show: false },
    xaxis: {
      categories: categories,
    },
    tooltip: {
      y: {
        formatter: formatter,
      },
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
