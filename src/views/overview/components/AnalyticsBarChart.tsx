import React from "react";
import ChartBar from "../charts/ChartBar";
import { Card, CardHeader, CardContent } from "@mui/material";

type AnalyticsBarChartProps = {
  title: string;
  CHART_DATA: Array<any>;
  categories: Array<string>;
  height?: number;
}

export default function AnalyticsBarChart({
  title,
  CHART_DATA,
  categories,
  height = 320
}: AnalyticsBarChartProps) {
  return (
    <Card dir="ltr">
      <CardHeader title={title} />
      <CardContent>
        <ChartBar CHART_DATA={CHART_DATA} categories={categories} height={height} />
      </CardContent>
    </Card>
  );
}
