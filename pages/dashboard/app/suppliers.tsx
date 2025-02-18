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
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
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
import { useSupplier } from "src/hooks/useSupplier";
import { sentenceCase } from "change-case";
import SearchNotFound from "src/components/SearchNotFound";
import SupplierMenu from "src/views/dashboard/app/supplier/SupplierMenu";
import SupplierCreate from "src/views/dashboard/app/supplier/SupplierCreate";
import { Search } from "@mui/icons-material";
import SupplierDetail from "src/views/dashboard/app/supplier/SupplierDetails";
import { toast } from "react-toastify";


const TABLE_HEAD = [
  { id: "companyName", label: "Company", alignRight: false },
  { id: "contactPerson", label: "Contact Person", alignRight: false },
  { id: "country", label: "Country", alignRight: false },
  { id: "rating", label: "Rating", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

// Replace REGIONS constant with COUNTRIES
const STATUS_OPTIONS = ["active", "inactive"];

// ----------------------------------------------------------------------

export default function Suppliers() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const { suppliers, setSuppliers } = useSupplier();
  const [page, setPage] = useState<number>(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filterName, setFilterName] = useState<string>("");
  const [filterCountry, setFilterCountry] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
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

  const COUNTRIES: string[] = Array.from(
    new Set(suppliers.map((sup: any) => sup.country))
  ).sort() as unknown as string[];

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - suppliers.length) : 0;

  const isUserNotFound = suppliers.length === 0;

  const filteredSuppliers = suppliers
    .filter((supplier: any) => {
      if (filterCountry !== "all" && supplier.country !== filterCountry)
        return false;
      if (filterStatus !== "all" && supplier.status !== filterStatus)
        return false;
      const matchesSearch = searchQuery
        ? supplier.companyName.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesSearch;
    })
    .sort((a: any, b: any) => {
      return sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating;
    });

  const handleOpenDetails = (supplier: any) => {
    setSelectedSupplier(supplier);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedSupplier(null);
  };

  const handleDeleteSupplier = (selectedSupplier: any) => {
    setSuppliers(suppliers.filter((s: any) => s.id !== selectedSupplier.id));
    toast.error(`Supplier deleted successfully`);
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  return (
    <DashboardLayout>
      <Page title="Suppliers | SPAnalysis">
        <Container maxWidth={themeStretch ? false : "xl"}>
          <HeaderBreadcrumbs
            heading="Suppliers"
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: "Management" },
              { name: "List" },
            ]}
            action={
              <Button
                variant="contained"
                onClick={handleOpenCreate}
                startIcon={<Icon icon={plusFill} />}
              >
                New Supplier
              </Button>
            }
          />

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
              placeholder="Search by company name..."
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <Search/>
                </InputAdornment>,
              }}
            />

          <Box sx={{ mb: 3, mt: 2, display: "flex", gap: 2 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Country</InputLabel>
              <Select
                value={filterCountry}
                label="Country"
                onChange={(e: SelectChangeEvent) =>
                  setFilterCountry(e.target.value)
                }
              >
                <MenuItem value="all">All Countries</MenuItem>
                {COUNTRIES.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e: SelectChangeEvent) =>
                  setFilterStatus(e.target.value)
                }
              >
                <MenuItem value="all">All</MenuItem>
                {STATUS_OPTIONS.map((status) => (
                  <MenuItem key={status} value={status}>
                    {sentenceCase(status)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Rating</InputLabel>
              <Select
                value={sortOrder}
                label="Rating"
                onChange={(e: SelectChangeEvent) =>
                  setSortOrder(e.target.value as "asc" | "desc")
                }
              >
                <MenuItem value="desc">Highest First</MenuItem>
                <MenuItem value="asc">Lowest First</MenuItem>
              </Select>
            </FormControl>
          </Box>
          </Stack>
        </Container>

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
                            selected.length < suppliers.length
                          }
                          checked={
                            suppliers.length > 0 &&
                            selected.length === suppliers.length
                          }
                          onChange={(event) => {
                            if (event.target.checked) {
                              const newSelecteds = suppliers.map(
                                (n: any) => n.companyName
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
                    {filteredSuppliers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row: any) => {
                        const {
                          id,
                          companyName,
                          contactPerson,
                          country,
                          rating,
                          status = "active",
                        } = row;
                        const isItemSelected =
                          selected.indexOf(companyName) !== -1;

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
                                onClick={() => handleClick(companyName)}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Typography variant="subtitle2" noWrap>
                                {companyName}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Typography variant="body2">
                                  {contactPerson.name}
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    color="textSecondary"
                                  >
                                    {contactPerson.email}
                                  </Typography>
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{country}</TableCell>
                            <TableCell align="left">{rating}/5</TableCell>
                            <TableCell align="left">
                              <Label
                                variant={
                                  theme.palette.mode === "light"
                                    ? "ghost"
                                    : "filled"
                                }
                                color={
                                  status === "active" ? "success" : "error"
                                }
                              >
                                {sentenceCase(status)}
                              </Label>
                            </TableCell>
                            <TableCell align="right">
                              <SupplierMenu
                                onDelete={() => handleDeleteSupplier(row)}
                                onOpen={() => handleOpenDetails(row)}
                                supplier={row}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
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
            count={filteredSuppliers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Container>
      </Page>
      <SupplierCreate
        openModal={openCreate}
        handleClose={handleCloseCreate}
      />
      <SupplierDetail
        openModal={openDetails}
        handleClose={handleCloseDetails}
        supplier={selectedSupplier}
      />
    </DashboardLayout>
  );
}
