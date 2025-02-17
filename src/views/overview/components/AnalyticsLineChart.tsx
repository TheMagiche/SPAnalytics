import React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import ChartLine from "../charts/ChartLine";

type AnalyticsLineChartProps = {
  title: string;
  CHART_DATA: Array<any>;
  categories: Array<string>;
  height?: number;
}

export default function AnalyticsLineChart({
  title,
  CHART_DATA,
  categories,
  height = 320
}: AnalyticsLineChartProps) {
  return (
    <Card dir="ltr">
      <CardHeader title={title} />
      <CardContent>
        <ChartLine CHART_DATA={CHART_DATA} categories={categories} height={height} />
      </CardContent>
    </Card>
  );
}
