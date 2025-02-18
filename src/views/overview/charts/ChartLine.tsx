import { merge } from "lodash";
import BaseOptionChart from "./BaseOptionChart";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type ChartLineProps = {
  CHART_DATA: Array<any>; //  CHART_DATA = [{ name: 'Desktops', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] }];
  categories: Array<string>; // [ '01/01/2003','02/01/2003','03/01/2003','04/01/2003','05/01/2003','06/01/2003','07/01/2003','08/01/2003','09/01/2003','10/01/2003','11/01/2003']
  height?: number;
};

export default function ChartLine({
  CHART_DATA,
  categories,
  height = 320,
}: ChartLineProps) {
  const chartOptions = merge(BaseOptionChart(), {
    labels: categories,
    xaxis: {
      type: 'datetime'
    },
    yaxis: { title: { text: 'Sustainability Score' }, min: 0 },
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
