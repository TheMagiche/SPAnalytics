import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  Rating,
  Stack,
  DialogActions,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { sentenceCase } from "change-case";

interface SupplierDetailProps {
  openModal: boolean;
  handleClose: () => void;
  supplier: any;
}

const SupplierDetail: React.FC<SupplierDetailProps> = ({
  openModal,
  handleClose,
  supplier,
}: SupplierDetailProps) => {
  if (!supplier) return null;

  return (
    <Dialog open={openModal} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h4">{supplier.companyName}</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ pt: 2 }}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Tax ID
                </Typography>
                <Typography variant="body1">{supplier.taxId}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Contact Person
                </Typography>
                <Typography variant="body1">
                  {supplier.contactPerson.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {supplier.contactPerson.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {supplier.contactPerson.role}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {supplier.contactPerson.phone}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Country
                </Typography>
                <Typography variant="body1">{supplier.country}</Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
            <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Address
                </Typography>
                <Typography variant="body1">{supplier.address}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={sentenceCase(supplier.status)}
                  color={supplier.status === "active" ? "success" : "error"}
                  size="small"
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Rating
                </Typography>
                <Rating value={supplier.rating} readOnly precision={0.5} />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SupplierDetail;
