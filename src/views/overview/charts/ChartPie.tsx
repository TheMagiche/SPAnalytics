import { merge } from "lodash";
import BaseOptionChart from "./BaseOptionChart";
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export type ChartPieProps = {
  CHART_DATA: Array<number>;
  labels: Array<string>;
  width: number;
};

export default function ChartPie({ CHART_DATA, labels, width }: ChartPieProps) {
  const chartOptions = merge(BaseOptionChart(), {
    labels: labels,
    legend: {
      position: "right",
      offsetX: -50,
      offsetY: 4,
      itemMargin: { vertical: 8 },
    },
    stroke: { show: false },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  return (
    <ReactApexChart
      type="pie"
      series={CHART_DATA}
      options={chartOptions}
      width={width}
    />
  );
}
