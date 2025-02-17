import { Card, Container, Grid, NoSsr, Typography } from "@mui/material";
import DashboardLayout from "src/layouts/dashboard";
import useSettings from "src/hooks/useSettings";
import Page from "src/components/Page";
import AnalyticsCarbonEmission from "src/views/overview/components/AnalyticsCarbonEmissions";
import AnalyticsCarbonFootprint from "src/views/overview/components/AnalyticsCarbonFootprint";
import AnalyticsSustainabilityScore from "src/views/overview/components/AnalyticsSustainabilityScore";
import AnalyticsAnomalies from "src/views/overview/components/AnalyticsAnomalies";
import AnomaliesTable from "src/views/overview/tables/AnomaliesTable";
import AnalyticsPiechart from "src/views/overview/components/AnalyticsPieChart";
import { useProcurement } from "src/hooks/useProcurement";
import DisplayWidget from "src/views/overview/widgets/DisplayWidget";
import { useState } from "react";

export default function Dashboard() {
  const { themeStretch } = useSettings();
  const [category, setCategory] = useState("emissions");

  const {
    averageCarbonEmissionsByRegion,
    highestRegion,
    lowestRegion,
  } = useProcurement();

  return (
    <DashboardLayout>
      <Page title="Dashboard | SPAnalytics">
        <Container maxWidth={themeStretch ? false : "xl"}>
          <Typography variant="h3" component="h1" paragraph>
            Welcome, Admin
          </Typography>

          <Grid container my={2} spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                onClick={() => setCategory("emissions")}
                sx={{ cursor: "pointer", opacity: category === 'emissions' ? 1 : 0.5 }}
              >
                <NoSsr>
                  <AnalyticsCarbonEmission />
                </NoSsr>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                onClick={() => setCategory("footprint")}
                sx={{ cursor: "pointer", opacity: category === 'footprint' ? 1 : 0.5 }}
              >
                <NoSsr>
                  <AnalyticsCarbonFootprint />
                </NoSsr>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                onClick={() => setCategory("sustainability")}
                sx={{ cursor: "pointer", opacity: category === 'sustainability' ? 1 : 0.5 }}
              >
                <NoSsr>
                  <AnalyticsSustainabilityScore />
                </NoSsr>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                onClick={() => setCategory("anomalies")}
                sx={{ cursor: "pointer", opacity: category === 'anomalies' ? 1 : 0.5 }}
              >
                <NoSsr>
                  <AnalyticsAnomalies />
                </NoSsr>
              </Card>
            </Grid>
          </Grid>

          {category === 'emissions' && <Grid container my={2} spacing={2}>
            <Grid item xs={12} md={8}>
              <NoSsr>
                <AnalyticsPiechart
                  title={"CO₂ by region"}
                  chartData={averageCarbonEmissionsByRegion.map(
                    (data) => data.averageEmissions
                  )}
                  labels={averageCarbonEmissionsByRegion.map(
                    (data) => data.region
                  )}
                  width={600}
                />
              </NoSsr>
            </Grid>
            <Grid item xs={12} md={4}>
              <NoSsr>
                {highestRegion?.averageEmissions && (
                  <DisplayWidget
                    title={`Highest ${highestRegion?.region}`}
                    TOTAL={highestRegion?.averageEmissions || 0}
                    CHART_DATA={[(highestRegion?.averageEmissions || 0) / 100]}
                    icon={"eva:alert-triangle-fill"}
                    color={"common.white"}
                  />
                )}
              </NoSsr>
              <br />
              <NoSsr>
                {highestRegion?.averageEmissions && (
                  <DisplayWidget
                    title={`Lowest ${lowestRegion?.region}`}
                    TOTAL={lowestRegion?.averageEmissions || 0}
                    CHART_DATA={[(lowestRegion?.averageEmissions || 0) / 100]}
                    icon={"eva:activity-outline"}
                    color={"common.white"}
                  />
                )}
              </NoSsr>
            </Grid>
          </Grid>}

          {category === 'anomalies' && <Grid container my={2} spacing={2}>
            <Grid item xs={12}>
              <NoSsr>
                <AnomaliesTable />
              </NoSsr>
            </Grid>
          </Grid>}
        </Container>
      </Page>
    </DashboardLayout>
  );
}
