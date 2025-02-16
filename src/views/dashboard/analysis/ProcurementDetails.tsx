import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
  Grid,
  Divider,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import { Icon } from "@iconify/react";
import closeFill from "@iconify/icons-eva/close-fill";
import { fDate, fCurrency } from "src/utils/helper";
import { sentenceCase } from "change-case";
import { exportSuppliers } from "src/utils/mock-data/supplier";

interface ProcurementDetailProps {
  openModal: boolean;
  handleClose: () => void;
  procurement: any;
}

const ProcurementDetail: React.FC<ProcurementDetailProps> = ({
  openModal,
  handleClose,
  procurement,
}: ProcurementDetailProps) => {
  if (!procurement) return null;

  const supplier: any = exportSuppliers.filter(
    (sup) => sup.id === procurement.supplierId
  )[0];

  return (
    <Dialog open={openModal} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h4">Procurement Details</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              (ID: {procurement.id})
            </Typography>
          </Stack>
          <IconButton onClick={handleClose}>
            <Icon icon={closeFill} width={20} height={20} />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={2}>
              <Typography variant="h6" color="primary">
                {procurement.title}
              </Typography>
              <Divider />
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Date
                </Typography>
                <Typography variant="body2">
                  {fDate(procurement.date)}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Region
                </Typography>
                <Typography variant="body2">{procurement.region}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Area Type
                </Typography>
                <Typography variant="body2">{procurement.subRegion}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                      label={sentenceCase(procurement.status)}
                      color={procurement.status === "completed" ? "success" : "warning"}
                      size="small"
                    />
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack spacing={2}>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Quanitity
                </Typography>
                <Typography variant="body2">{procurement.quantity} Kgs</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Amount Spent
                </Typography>
                <Typography variant="body2">
                  {fCurrency(procurement.amountSpent)}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Environmental Impact
                </Typography>
                <Typography variant="body2">
                  CO₂ emissions: {procurement.environmentalImpact.carbonEmissions}kg
                </Typography>
                <Typography variant="body2">
                  CO₂ footpring: {procurement.environmentalImpact.carbonFootprint}/10
                </Typography>
                <Typography variant="body2">
                  Sustainability Score:{" "}
                  {procurement.environmentalImpact.sustainabilityScore}/5
                </Typography>
              </Box>

            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Supplier Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Supplier Name
                    </Typography>
                    <Typography variant="body2">
                      {supplier?.companyName || "N/A"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Contact Person
                    </Typography>
                    <Typography variant="body2">
                      {supplier?.contactPerson?.name || "N/A"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body2">
                      {supplier?.contactPerson?.email || "N/A"}
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
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body2">
                      {supplier?.contactPerson?.phone || "N/A"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Address
                    </Typography>
                    <Typography variant="body2">
                      {supplier?.address || "N/A"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Sustainability Rating
                    </Typography>
                    <Typography variant="body2">
                      {supplier?.rating ? `${supplier.rating}/5` : "N/A"}
                    </Typography>
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
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProcurementDetail;
