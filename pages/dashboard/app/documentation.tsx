import { Container, NoSsr, Typography } from "@mui/material";
// layouts
import DashboardLayout from "src/layouts/dashboard";
// hooks
import useSettings from "src/hooks/useSettings";
// components
import Page from "src/components/Page";
import ProcurementFlowchart from "src/views/dashboard/app/documentation/ProcurementFlowchart";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "src/routes/paths";
import Scrollbar from "src/components/Scrollbar";

// ----------------------------------------------------------------------

export default function Documentation() {
  const { themeStretch } = useSettings();

  return (
    <DashboardLayout>
      <Page title="Documentation | SPAnalysis">
        <Container maxWidth={themeStretch ? false : "xl"}>
          <HeaderBreadcrumbs
            heading="Documentation"
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: "Management" },
              { name: "Documentation" },
            ]}
          />
        </Container>
        <Scrollbar height={'80%'} sx={{width: '90%', margin: '1px auto'}}>
          <Typography variant="h3" component="h2" paragraph>
            Project Analysis & Approach
          </Typography>
          <Typography variant="h4" component="h4" paragraph>
            1. Core Requirements Breakdown
          </Typography>
          <Typography variant="h5" component="h4" paragraph>
            Data Visualization Requirements
          </Typography>
          <Typography variant="h5" component="h4" paragraph>
            a. Anomalies Detection
          </Typography>
          <Typography paragraph>Fraudulent behavior indicators</Typography>
          <Typography paragraph>
            Unusual purchase patterns (high/low)
          </Typography>
          <Typography paragraph>Visual alerts and notifications</Typography>
          <Typography variant="h5" component="h4" paragraph>
            b. Data Insights
          </Typography>
          <Typography paragraph>
            Macro view (zoomed-out aggregated data)
          </Typography>
          <Typography paragraph>
            Micro view (zoomed-in detailed data)
          </Typography>
          <Typography paragraph>
            Regional patterns Supply type analysis
          </Typography>
          <Typography variant="h5" component="h4" paragraph>
            c. Trend Analysis
          </Typography>
          <Typography paragraph>Time-series visualization</Typography>
          <Typography paragraph>Pattern recognition</Typography>
          <Typography paragraph>Historical comparisons</Typography>
          <Typography variant="h4" component="h4" paragraph>
            2. User flow
          </Typography>
          <Typography variant="h5" component="h4" paragraph>
            a. Authentication Flow
          </Typography>
          <Typography paragraph>
            New users sign up and complete organization profile
          </Typography>
          <Typography paragraph>Existing users directly login</Typography>
          <Typography paragraph>Both paths lead to dashboard home</Typography>
          <Typography variant="h5" component="h4" paragraph>
            b. Procurement Activities Flow
          </Typography>
          <Typography paragraph>Add new procurement activity</Typography>
          <Typography paragraph>Select supplier</Typography>
          <Typography paragraph>Enter purchase details</Typography>
          <Typography paragraph>Add supporting documents</Typography>
          <Typography paragraph>Submit for review</Typography>
          <Typography paragraph>Return to dashboard</Typography>
          <Typography variant="h5" component="h4" paragraph>
            c. Analytics Flow
          </Typography>
          <Typography paragraph>View analytics dashboard</Typography>
          <Typography paragraph>
            Each section allows drill-down to detailed analysis
          </Typography>
          <Typography paragraph>Option to export or share insights</Typography>
          <Typography variant="h5" component="h4" paragraph>
            d. Settings Flow
          </Typography>
          <Typography paragraph>Configure alert thresholds</Typography>
          <Typography paragraph>Add suppliers</Typography>
          <Typography paragraph>Set up regions</Typography>
          <Typography variant="h5" component="h4" paragraph>
            d. Filter Flow
          </Typography>
          <Typography paragraph>Apply various filters:</Typography>
          <Typography paragraph>Filtered view updates dashboard</Typography>
          <NoSsr>
            <ProcurementFlowchart />
          </NoSsr>
        </Scrollbar>
      </Page>
    </DashboardLayout>
  );
}
