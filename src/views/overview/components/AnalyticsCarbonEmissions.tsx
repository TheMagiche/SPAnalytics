import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
import Co2Icon from "@mui/icons-material/Co2";
import { fShortenNumber } from "src/utils/helper";
import { useProcurement } from "src/hooks/useProcurement";

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundImage: `linear-gradient(135deg,
  ${theme.palette.primary.main} 0%,
  ${theme.palette.primary.light} 100%)`,
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.dark,
    0
  )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
}));

export default function AnalyticsCarbonEmission() {
  const { averageCarbonEmissions } = useProcurement();

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Co2Icon width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">
        {fShortenNumber(averageCarbonEmissions)}
        <small>kg</small>
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Avg carbon emissions
      </Typography>
    </RootStyle>
  );
}
