import { Container, Typography } from '@mui/material';
import DashboardLayout from 'src/layouts/dashboard';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';


export default function ExpenseRevenue() {
  const { themeStretch } = useSettings();

  return (
    <DashboardLayout>
      <Page title='Expenses & Revenue | SPAnalytics'>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Typography variant='h3' component='h1' paragraph>
           Expenses & Revenue
          </Typography>

        </Container>
      </Page>
    </DashboardLayout>
  );
}
