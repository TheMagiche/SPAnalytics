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
  TextField,
  InputAdornment,
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
import { fDate, fCurrency } from "src/utils/helper";
import FilterDrawer from "src/views/dashboard/analysis/FilterDrawer";
import filterFill from "@iconify/icons-eva/funnel-fill";
import ProcurementMenu from "src/views/dashboard/analysis/ProcurementMenu";
import ProcurementDetails from "src/views/dashboard/analysis/ProcurementDetails";
import { Search } from "@mui/icons-material";
import { useProcurement } from "src/hooks/useProcurement";
import ProcurementCreate from "src/views/dashboard/analysis/ProcurementCreate";
import { toast } from "react-toastify";


const TABLE_HEAD = [
  { id: "id", label: "ID", alignRight: false },
  { id: "title", label: "Product", alignRight: false },
  { id: "date", label: "Date", alignRight: false },
  { id: "region", label: "Region", alignRight: false },
  { id: "amountSpent", label: "Amount", alignRight: true },
  {
    id: "environmentalImpact",
    label: "Environmental Impact",
    alignRight: false,
  },
  { id: "status", label: "Status", alignRight: false },
];


export default function Analytics() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const {procurements, setProcurements} = useProcurement();
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
  const [selectedProcurement, setSelectedProcurement] = useState<any>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openCreate, setOpenCreate] = useState(false);

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

  const filteredProcurements = procurements.filter((procurements: any) => {
    const matchesRegion =
      filterRegion === "all" ? true : procurements.region === filterRegion;
    const matchesProduct =
      filterProduct === "all" ? true : procurements.title === filterProduct;
    const matchesAmount =
      procurements.amountSpent >= amountRange[0] &&
      procurements.amountSpent <= amountRange[1];
    const matchesStatus =
      filterStatus === "all" ? true : procurements.status === filterStatus;
    const matchesSearch = searchQuery 
      ? procurements.id.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const procurementDate = new Date(procurements.date);
    const matchesStartDate = startDate ? procurementDate >= startDate : true;
    const matchesEndDate = endDate ? procurementDate <= endDate : true;

    return (
      matchesRegion &&
      matchesProduct &&
      matchesAmount &&
      matchesStartDate &&
      matchesEndDate &&
      matchesStatus &&
      matchesSearch
    );
  });

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredProcurements.length)
      : 0;

  const isDataNotFound = filteredProcurements.length === 0;

  const handleOpenDetails = (procurements: any) => {
    setSelectedProcurement(procurements);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedProcurement(null);
  };

  const handleDeleteProcurement = (selectedProcurement: any) => {
    setProcurements(procurements.filter((p: any) => p.id !== selectedProcurement.id));
    toast.error(`Procurement deleted successfully`);
  };

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
                  onClick={() => setOpenCreate(true)}
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
          <Stack 
            direction="row" 
            alignItems="center" 
            justifyContent="space-between"
            sx={{ mb: 3 }}
          >
            <TextField
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID..."
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <Search/>
                </InputAdornment>,
              }}
            />
          </Stack>

          <Scrollbar>
            <NoSsr>
              <TableContainer 
                sx={{ 
                  minWidth: 1300,
                  maxHeight: 'calc(100vh - 300px)',
                  overflow: 'auto'
                }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={
                            selected.length > 0 &&
                            selected.length < procurements.length
                          }
                          checked={
                            procurements.length > 0 &&
                            selected.length === procurements.length
                          }
                          onChange={(event) => {
                            if (event.target.checked) {
                              const newSelecteds = procurements.map(
                                (n: any) => n.id
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
                      .map((row: any) => {
                        const {
                          id,
                          title,
                          date,
                          region,
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
                            <TableCell align="left">
                              <Typography variant="subtitle2" noWrap>
                                {id}
                              </Typography>
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                              <Typography variant="subtitle2" noWrap>
                                {title}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">{fDate(date)}</TableCell>
                            <TableCell align="left">{region}</TableCell>
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
                            <TableCell align="right">
                              <ProcurementMenu
                                procurement={row}
                                onDelete={() => handleDeleteProcurement(row)}
                                onOpen={handleOpenDetails}
                              />
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

      <ProcurementDetails
        openModal={openDetails}
        handleClose={handleCloseDetails}
        procurement={selectedProcurement}
      />

      <ProcurementCreate
        openModal={openCreate}
        handleClose={() => setOpenCreate(false)}
      />
    </DashboardLayout>
  );
}
