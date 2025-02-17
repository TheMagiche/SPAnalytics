import React from "react";
import ChartColumnMultiple from "../charts/ChartColumnMultiple";
import { Card, CardHeader, CardContent } from "@mui/material";

type AnalyticsColumnMultipleChartProps = {
  title: string;
  CHART_DATA: Array<any>;
  categories: Array<string>;
  formatter?: any;
  height?: number;
}

export default function AnalyticsColumnMultipleChart({
  title,
  CHART_DATA,
  categories,
  height = 320
}: AnalyticsColumnMultipleChartProps) {
  return (
    <Card dir="ltr">
      <CardHeader title={title} />
      <CardContent>
        <ChartColumnMultiple CHART_DATA={CHART_DATA} categories={categories} height={height} />
      </CardContent>
    </Card>
  );
}
