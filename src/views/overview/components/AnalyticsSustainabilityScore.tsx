import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { fShortenNumber } from 'src/utils/helper';
import { useProcurement } from 'src/hooks/useProcurement';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundImage: `linear-gradient(135deg,
  ${theme.palette.warning.main} 0%,
  ${theme.palette.warning.light} 100%)`,
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));


export default function AnalyticsSustainabilityScore() {
  const { averageSustainabilityScore } = useProcurement();

  return (
    <RootStyle>
      <IconWrapperStyle>
        <VolunteerActivismIcon width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(averageSustainabilityScore)}<small>/5</small></Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Avg sustainability score
      </Typography>
    </RootStyle>
  );
}
