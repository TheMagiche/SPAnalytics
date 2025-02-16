import { Button, Card, Container, Grid, Stack, TextField } from "@mui/material";
// layouts
import DashboardLayout from "src/layouts/dashboard";
// hooks
import useSettings from "src/hooks/useSettings";
// components
import Page from "src/components/Page";
import { PATH_DASHBOARD } from "src/routes/paths";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import { useEffect, useState } from "react";
import { useGlobalSettings } from "src/hooks/useGlobalSettings";

// ----------------------------------------------------------------------

export default function GlobalSettings() {
  const { themeStretch } = useSettings();
  const {
    upperThreshold,
    setUpperThreshold,
    lowerThreshold,
    setLowerThreshold,
  } = useGlobalSettings();
  const [displayUpperThreshold, setDisplayUpperThreshold] =
    useState<string>("");
  const [displayLowerThreshold, setDisplayLowerThreshold] =
    useState<string>("");
  const [upperError, setUpperError] = useState<string>("");
  const [lowerError, setLowerError] = useState<string>("");

  useEffect(() => {
    setDisplayUpperThreshold(`${upperThreshold}`);
    setDisplayLowerThreshold(`${lowerThreshold}`);
  }, []);

  const isValidInteger = (value: string) => {
    if (!value?.trim()) return false;
    return /^\d+$/.test(value);
  };

  const handleSave = () => {
    let hasError = false;

    if (!displayUpperThreshold?.trim()) {
      setUpperError("This field is required");
      hasError = true;
    } else if (!isValidInteger(displayUpperThreshold)) {
      setUpperError("Please enter a valid integer");
      hasError = true;
    } else {
      setUpperError("");
    }

    if (!displayLowerThreshold?.trim()) {
      setLowerError("This field is required");
      hasError = true;
    } else if (!isValidInteger(displayLowerThreshold)) {
      setLowerError("Please enter a valid integer");
      hasError = true;
    } else {
      setLowerError("");
    }

    if (!hasError) {
      setUpperThreshold(parseInt(displayUpperThreshold));
      setLowerThreshold(parseInt(displayLowerThreshold));
    }
  };

  return (
    <DashboardLayout>
      <Page title="Global Settings | SPAnalysis">
        <Container maxWidth={themeStretch ? false : "xl"}>
          <HeaderBreadcrumbs
            heading="Global settings"
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: "Management" },
              { name: "Global settings" },
            ]}
          />
        </Container>
        <Container maxWidth={themeStretch ? false : "xl"}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    value={displayUpperThreshold}
                    onChange={(e) => {
                      setDisplayUpperThreshold(e.target.value);
                    }}
                    error={!!upperError}
                    helperText={upperError}
                    label="Upper threshold"
                  />
                  <TextField
                    fullWidth
                    value={displayLowerThreshold}
                    onChange={(e) => {
                      setDisplayLowerThreshold(e.target.value);
                    }}
                    error={!!lowerError}
                    helperText={lowerError}
                    label="Lower threshold"
                  />
                </Stack>
                <Button variant="contained" onClick={() => handleSave()}>
                  Save
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Container>
      </Page>
    </DashboardLayout>
  );
}
