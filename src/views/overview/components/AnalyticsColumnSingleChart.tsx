import React from "react";
import ChartColumnSingle from "../charts/ChartColumnSingle";
import { Card, CardHeader, CardContent } from "@mui/material";

type AnalyticsColumnSingleChartProps = {
  title: string;
  CHART_DATA: Array<any>;
  categories: Array<string>;
  formatter?: any;
  height?: number;
}

export default function AnalyticsColumnSingleChart({
  title,
  CHART_DATA,
  categories,
  height = 320
}: AnalyticsColumnSingleChartProps) {
  return (
    <Card dir="ltr">
      <CardHeader title={title} />
      <CardContent>
        <ChartColumnSingle CHART_DATA={CHART_DATA} categories={categories} height={height} />
      </CardContent>
    </Card>
  );
}
