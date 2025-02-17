import { merge } from "lodash";
import { Icon, IconifyIcon } from "@iconify/react";
import { useTheme, styled } from "@mui/material/styles";
import { Card, Typography, Box } from "@mui/material";
import BaseOptionChart from "../charts/BaseOptionChart";
import { fNumber } from "src/utils/helper";

import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const RootStyle = styled(Card)(({ theme }) => ({
  display: "flex",
  position: "relative",
  alignItems: "center",
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.darker,
}));

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 120,
  height: 120,
  opacity: 0.12,
  position: "absolute",
  right: theme.spacing(-3),
  color: theme.palette.common.white,
}));

type DisplayWidgetProps = {
  title: string;
  TOTAL: number;
  CHART_DATA: number[];
  icon: string | IconifyIcon;
  color: string;
  chartType?:
    | "area"
    | "line"
    | "radialBar"
    | "bar"
    | "pie"
    | "donut"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap"
    | undefined;
};

export default function DisplayWidget({
  title,
  TOTAL,
  CHART_DATA,
  icon,
  color,
  chartType = "radialBar",
}: DisplayWidgetProps) {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    chart: { sparkline: { enabled: true } },
    legend: { show: false },
    plotOptions: {
      radialBar: {
        hollow: { size: "78%" },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            color: theme.palette.common.white,
            fontSize: theme.typography.subtitle2.fontSize,
          },
        },
      },
    },
  });

  return (
    <RootStyle>
      <ReactApexChart
        type={chartType}
        series={CHART_DATA}
        options={chartOptions}
        width={86}
        height={86}
      />
      <Box sx={{ ml: 3, color: color }}>
        <Typography variant="h4"> {fNumber(TOTAL)}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.72 }}>
          {title}
        </Typography>
      </Box>
      <IconStyle icon={icon} />
    </RootStyle>
  );
}
