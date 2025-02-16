import {
  Button,
  Checkbox,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
  TableHead,
  NoSsr,
} from "@mui/material";
import DashboardLayout from "src/layouts/dashboard";
import useSettings from "src/hooks/useSettings";
import Page from "src/components/Page";
import { PATH_DASHBOARD } from "src/routes/paths";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import Scrollbar from "src/components/Scrollbar";
import React, { useState } from "react";
import Label from "src/components/Label";
import { sentenceCase } from "change-case";
import SearchNotFound from "src/components/SearchNotFound";
import { exportProcurements } from "src/utils/mock-data/procurement";
import { fDate, fCurrency } from "src/utils/helper";
import FilterDrawer from "src/views/dashboard/analysis/FilterDrawer";
import filterFill from "@iconify/icons-eva/funnel-fill";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "title", label: "Product", alignRight: false },
  { id: "date", label: "Date", alignRight: false },
  { id: "region", label: "Region", alignRight: false },
  { id: "subRegion", label: "Area Type", alignRight: false },
  { id: "amountSpent", label: "Amount", alignRight: true },
  {
    id: "environmentalImpact",
    label: "Environmental Impact",
    alignRight: false,
  },
  { id: "status", label: "Status", alignRight: false },
];

// ----------------------------------------------------------------------

export default function Analytics() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const [page, setPage] = useState<number>(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filterName, setFilterName] = useState<string>("");
  const [filterRegion, setFilterRegion] = useState<string>("all");
  const [filterProduct, setFilterProduct] = useState<string>("all");
  const [amountRange, setAmountRange] = useState<number[]>([0, 100000]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Update filtered procurements to include date range and status
  const filteredProcurements = exportProcurements.filter((procurement) => {
    const matchesRegion =
      filterRegion === "all" ? true : procurement.region === filterRegion;
    const matchesProduct =
      filterProduct === "all" ? true : procurement.title === filterProduct;
    const matchesAmount =
      procurement.amountSpent >= amountRange[0] &&
      procurement.amountSpent <= amountRange[1];
    const matchesStatus =
      filterStatus === "all" ? true : procurement.status === filterStatus;

    const procurementDate = new Date(procurement.date);
    const matchesStartDate = startDate ? procurementDate >= startDate : true;
    const matchesEndDate = endDate ? procurementDate <= endDate : true;

    return (
      matchesRegion &&
      matchesProduct &&
      matchesAmount &&
      matchesStartDate &&
      matchesEndDate &&
      matchesStatus
    );
  });

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredProcurements.length)
      : 0;

  const isDataNotFound = filteredProcurements.length === 0;

  return (
    <DashboardLayout>
      <Page title="Procurement Analysis | SPAnalysis">
        <Container maxWidth={themeStretch ? false : "xl"}>
          <HeaderBreadcrumbs
            heading="Procurement Analysis"
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: "General" },
              { name: "Procurement Analysis" },
            ]}
            action={
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<Icon icon={filterFill} />}
                  onClick={() => setOpenFilter(true)}
                >
                  Filters
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Icon icon={plusFill} />}
                  onClick={() => {}}
                >
                  New Procurement
                </Button>
              </Stack>
            }
          />
        </Container>

        <FilterDrawer
          open={openFilter}
          setOpen={setOpenFilter}
          filterRegion={filterRegion}
          setFilterRegion={setFilterRegion}
          filterProduct={filterProduct}
          setFilterProduct={setFilterProduct}
          amountRange={amountRange}
          setAmountRange={setAmountRange}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          setPage={setPage}
        />
        <Container maxWidth={themeStretch ? false : "xl"}>
          <Scrollbar>
            <NoSsr>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={
                            selected.length > 0 &&
                            selected.length < exportProcurements.length
                          }
                          checked={
                            exportProcurements.length > 0 &&
                            selected.length === exportProcurements.length
                          }
                          onChange={(event) => {
                            if (event.target.checked) {
                              const newSelecteds = exportProcurements.map(
                                (n) => n.id
                              );
                              setSelected(newSelecteds);
                              return;
                            }
                            setSelected([]);
                          }}
                        />
                      </TableCell>
                      {TABLE_HEAD.map((headCell) => (
                        <TableCell
                          key={headCell.id}
                          align={headCell.alignRight ? "right" : "left"}
                        >
                          {headCell.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProcurements
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const {
                          id,
                          title,
                          date,
                          region,
                          subRegion,
                          amountSpent,
                          environmentalImpact,
                          status,
                        } = row;
                        const isItemSelected = selected.indexOf(id) !== -1;

                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onClick={() => handleClick(id)}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Typography variant="subtitle2" noWrap>
                                {title}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">{fDate(date)}</TableCell>
                            <TableCell align="left">{region}</TableCell>
                            <TableCell align="left">{subRegion}</TableCell>
                            <TableCell align="right">
                              {fCurrency(amountSpent)}
                            </TableCell>
                            <TableCell align="left">
                              <Stack spacing={1}>
                                <Typography
                                  variant="caption"
                                  color="textSecondary"
                                >
                                  CO₂: {environmentalImpact.carbonEmissions}kg
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="textSecondary"
                                >
                                  Score:{" "}
                                  {environmentalImpact.sustainabilityScore}/5
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">
                              <Label
                                variant={
                                  theme.palette.mode === "light"
                                    ? "ghost"
                                    : "filled"
                                }
                                color={
                                  status === "completed" ? "success" : "warning"
                                }
                              >
                                {sentenceCase(status)}
                              </Label>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={8} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isDataNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </NoSsr>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredProcurements.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Container>
      </Page>
    </DashboardLayout>
  );
}
