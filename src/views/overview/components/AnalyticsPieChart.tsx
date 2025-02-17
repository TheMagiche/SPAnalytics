import React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import ChartPie from "../charts/ChartPie";

type AnalyticsPiechartProps = {
  title: string;
  chartData: number[];
  labels: string[];
  width: number;
};

export default function AnalyticsPiechart({
  title,
  chartData,
  labels,
  width,
}: AnalyticsPiechartProps) {
  return (
    <Card dir="ltr">
      <CardHeader title={title} />
      <CardContent>
        <ChartPie CHART_DATA={chartData} labels={labels} width={width} />
      </CardContent>
    </Card>
  );
}
