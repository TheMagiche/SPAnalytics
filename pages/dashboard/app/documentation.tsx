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
        <Scrollbar height={"80%"} sx={{ width: "90%", margin: "1px auto" }}>
          <Typography variant="h3" component="h2" paragraph>
            Visualization Design and Scalability considerations
          </Typography>
          <Typography variant="h4" component="h4" paragraph>
            1. Design Rationale
          </Typography>
          <Typography variant="h5" component="h4" paragraph>
            a. Responsive Design
          </Typography>
          <Typography paragraph>
            The minimal UI approach enhances responsiveness by utilizing a
            clean, modular design system. This ensures optimal viewing and
            interaction experiences across various devices and screen sizes. The
            lightweight component structure allows for quick adjustments to
            different viewport dimensions while maintaining functionality and
            visual hierarchy.
          </Typography>
          <Typography variant="h5" component="h4" paragraph>
            b. Performance Optimization
          </Typography>
          <Typography paragraph>
            Performance optimization is achieved through Next.js's core features
            including: automatic code splitting, server-side rendering, and
            static site generation capabilities. These features ensure faster
            page loads, improved SEO, and better overall user experience. The
            implementation of dynamic imports and lazy loading further optimizes
            the application's performance.
          </Typography>
          <Typography variant="h5" component="h4" paragraph>
            c. User-Friendly Interface
          </Typography>
          <Typography paragraph>
            The minimal UI framework provides an intuitive and clean interface
            that reduces cognitive load. Key features include consistent
            navigation patterns, clear visual hierarchy, and contextual feedback
            mechanisms. The simplified design elements ensure users can easily
            understand and interact with the system's features without
            unnecessary complexity.
          </Typography>
          <Typography variant="h4" component="h4" paragraph>
            2. Visual Design and accessibility
          </Typography>
          <Typography variant="h5" component="h4" paragraph>
            a. Color Scheme
          </Typography>
          <Typography paragraph>
            The theme system offers carefully crafted light and dark modes that
            comply with WCAG 2.1 contrast guidelines. The color palette is
            designed to minimize eye strain during extended use, while
            maintaining clear visual distinction between interface elements. The
            seamless mode switching ensures comfortable viewing in different
            lighting conditions.
          </Typography>
          <Typography variant="h5" component="h4" paragraph>
            b. Typography
          </Typography>
          <Typography paragraph>
            The typography system employs Roboto as the primary font, offering
            excellent readability across different screen sizes and resolutions.
            The hierarchical scale of font sizes (from 0.75rem to 2.5rem)
            ensures proper content organization and scanning patterns. Font
            weights are optimized for both regular content and emphasis where
            needed.
          </Typography>
          <Typography variant="h4" component="h4" paragraph>
            3. Scalability considerations
          </Typography>
          <Typography variant="h5" component="h4" paragraph>
            a. Scalable Responsive Design
          </Typography>
          <Typography paragraph>
            The framework's component architecture enables seamless scaling of
            responsive features. Built-in grid systems and flexbox layouts
            automatically adjust to varying screen sizes and content amounts.
            The performance optimization techniques, including code splitting
            and lazy loading, ensure the application remains responsive as it
            grows in complexity and data volume.
          </Typography>
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
