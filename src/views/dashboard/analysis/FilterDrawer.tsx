import React from "react";
import {
  Drawer,
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
  Slider,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { exportProcurements } from "src/utils/mock-data/procurement";
import { fCurrency } from "src/utils/helper";
import dayjs from "dayjs";

type FilterDrawerProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filterRegion: string;
  setFilterRegion: (value: string) => void;
  filterProduct: string;
  setFilterProduct: (value: string) => void;
  amountRange: number[];
  setAmountRange: (value: number[]) => void;
  startDate: Date | null;
  setStartDate: (value: Date | null) => void;
  endDate: Date | null;
  setEndDate: (value: Date | null) => void;
  setPage: (value: number) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
};

const FilterDrawer = ({
  open,
  setOpen,
  filterRegion,
  setFilterRegion,
  filterProduct,
  setFilterProduct,
  amountRange,
  setAmountRange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setPage,
  filterStatus,
  setFilterStatus,
}: FilterDrawerProps) => {
  const uniqueRegions = Array.from(
    new Set(exportProcurements.map((proc) => proc.region))
  ).sort();

  const uniqueProducts = Array.from(
    new Set(exportProcurements.map((proc) => proc.title))
  ).sort();

  const amounts = exportProcurements.map((proc) => proc.amountSpent);
  const minAmount = Math.min(...amounts);
  const maxAmount = Math.max(...amounts);

  const uniqueStatuses = Array.from(
    new Set(exportProcurements.map((proc) => proc.status))
  ).sort();

  const handleRegionChange = (event: SelectChangeEvent<string>) => {
    setFilterRegion(event.target.value);
    setPage(0);
  };

  const handleProductChange = (event: SelectChangeEvent<string>) => {
    setFilterProduct(event.target.value);
    setPage(0);
  };

  const handleAmountChange = (event: Event, newValue: number | number[]) => {
    setAmountRange(newValue as number[]);
    setPage(0);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setFilterStatus(event.target.value);
    setPage(0);
  };

  const handleClearFilters = () => {
    setFilterRegion("all");
    setFilterProduct("all");
    setAmountRange([minAmount, maxAmount]);
    setStartDate(null);
    setEndDate(null);
    setFilterStatus("all");
    setPage(0);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        sx: { width: 360, padding: 3 },
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Filters
          </Typography>
        </Box>

        <FormControl fullWidth>
          <InputLabel>Region</InputLabel>
          <Select
            value={filterRegion}
            label="Region"
            onChange={handleRegionChange}
          >
            <MenuItem value="all">All Regions</MenuItem>
            {uniqueRegions.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Product</InputLabel>
          <Select
            value={filterProduct}
            label="Product"
            onChange={handleProductChange}
          >
            <MenuItem value="all">All Products</MenuItem>
            {uniqueProducts.map((product) => (
              <MenuItem key={product} value={product}>
                {product}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            label="Status"
            onChange={handleStatusChange}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            {uniqueStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status === "completed" ? "Completed" : "Pending"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <Typography gutterBottom>
            Date Range
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={2}>
              <DatePicker
                label="Start Date"
                value={dayjs(startDate)}
                onChange={(newValue) => {
                  setStartDate(newValue ? new Date(newValue.toDate()) : null);
                  setPage(0);
                }}
                selectedSections={undefined}
                onSelectedSectionsChange={undefined}
              />
              <DatePicker
                label="End Date"
                value={dayjs(endDate)}
                onChange={(newValue) => {
                  setEndDate(newValue ? new Date(newValue.toDate()) : null);
                  setPage(0);
                }}
                selectedSections={undefined}
                onSelectedSectionsChange={undefined}
              />
            </Stack>
          </LocalizationProvider>
        </Box>

        <Box>
          <Typography id="amount-range-slider" gutterBottom>
            Amount Range
          </Typography>
          <Slider
            value={amountRange}
            onChange={handleAmountChange}
            valueLabelDisplay="auto"
            min={minAmount}
            max={maxAmount}
            step={1000}
            valueLabelFormat={(value) => fCurrency(value)}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Typography variant="caption" color="textSecondary">
              {fCurrency(amountRange[0])}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {fCurrency(amountRange[1])}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleClearFilters}
            sx={{ mb: 3 }}
          >
            Clear All
          </Button>
        </Box>
      </Stack>
    </Drawer>
  );
};

export default FilterDrawer;
