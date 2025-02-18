import { Icon, IconifyIcon } from "@iconify/react";
import { styled } from "@mui/material/styles";
import { Card, Typography, Box } from "@mui/material";
import { fNumber } from "src/utils/helper";

const RootStyle = styled(Card)(({ theme, color = 'primary' }) => ({
  display: "flex",
  position: "relative",
  alignItems: "center",
  padding: theme.spacing(3),
  // @ts-ignore
  backgroundColor: theme.palette[`${color}`].darker,
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
  icon: string | IconifyIcon;
  color: string;
  bgColor?: 'primary' | 'warning' | 'info' | 'error' | 'success';
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
  icon,
  color,
  bgColor,
}: DisplayWidgetProps) {

  return (
    <RootStyle color={bgColor}>
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
