import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useProcurement } from "src/hooks/useProcurement";
import { exportSuppliers } from "src/utils/mock-data/supplier";
import { PRODUCT_TITLES } from "src/utils/mock-data/procurement";
import { useSnackbar } from "notistack";

interface ProcurementCreateProps {
  openModal: boolean;
  handleClose: () => void;
}

const SUB_REGIONS = ['Rural', 'Urban'];

interface FormValues {
  title: string;
  supplierId: string;
  subRegion: string;
  amountSpent: string;
  quantity: string;
  environmentalImpact: {
    carbonEmissions: string;
    sustainabilityScore: string;
  };
}

interface FormErrors {
  title?: string;
  supplierId?: string;
  subRegion?: string;
  amountSpent?: string;
  quantity?: string;
  environmentalImpact?: {
    carbonEmissions?: string;
    sustainabilityScore?: string;
  };
}

const initialValues: FormValues = {
  title: '',
  supplierId: '',
  subRegion: '',
  amountSpent: '',
  quantity: '',
  environmentalImpact: {
    carbonEmissions: '',
    sustainabilityScore: '',
  },
};

const ProcurementCreate: React.FC<ProcurementCreateProps> = ({
  openModal,
  handleClose,
}) => {
  const { setProcurements, procurements } = useProcurement();
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setValues((prev: any) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof FormValues],
          [child]: value
        }
      }));
    } else {
      setValues(prev => ({
        ...prev,
        [name]: value
      }));
    }
    // Clear errors when user types
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setErrors((prev: any) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof FormErrors],
          [child]: undefined
        }
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Product validation
    if (!values.title) {
      newErrors.title = 'Product is required';
      isValid = false;
    }

    // Supplier validation
    if (!values.supplierId) {
      newErrors.supplierId = 'Supplier is required';
      isValid = false;
    }

    // Sub Region validation
    if (!values.subRegion) {
      newErrors.subRegion = 'Sub Region is required';
      isValid = false;
    }

    // Amount validation
    if (!values.amountSpent) {
      newErrors.amountSpent = 'Amount is required';
      isValid = false;
    } else if (Number(values.amountSpent) <= 0) {
      newErrors.amountSpent = 'Amount must be greater than 0';
      isValid = false;
    }

    // Quantity validation
    if (!values.quantity) {
      newErrors.quantity = 'Quantity is required';
      isValid = false;
    } else if (Number(values.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
      isValid = false;
    }

    // Environmental Impact validation
    const environmentalErrors: FormErrors['environmentalImpact'] = {};

    if (!values.environmentalImpact.carbonEmissions) {
      environmentalErrors.carbonEmissions = 'Carbon emissions is required';
      isValid = false;
    } else if (Number(values.environmentalImpact.carbonEmissions) < 0) {
      environmentalErrors.carbonEmissions = 'Carbon emissions cannot be negative';
      isValid = false;
    }

    if (!values.environmentalImpact.sustainabilityScore) {
      environmentalErrors.sustainabilityScore = 'Sustainability score is required';
      isValid = false;
    } else {
      const score = Number(values.environmentalImpact.sustainabilityScore);
      if (score < 1 || score > 5) {
        environmentalErrors.sustainabilityScore = 'Score must be between 1 and 5';
        isValid = false;
      }
    }

    if (Object.keys(environmentalErrors).length > 0) {
      newErrors.environmentalImpact = environmentalErrors;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      enqueueSnackbar("Please fill in all required fields correctly", { variant: "error" });
      return;
    }

    const supplier = exportSuppliers.find(s => s.id === values.supplierId);
    const newProcurement = {
      id: `proc-${procurements.length + 1}-${Date.now()}`,
      ...values,
      amountSpent: Number(values.amountSpent),
      quantity: Number(values.quantity),
      date: new Date().toISOString(),
      region: supplier?.country || '',
      status: 'pending',
      environmentalImpact: {
        carbonEmissions: Number(values.environmentalImpact.carbonEmissions),
        sustainabilityScore: Number(values.environmentalImpact.sustainabilityScore),
        carbonFootprint: Number(values.environmentalImpact.carbonEmissions) / 100,
      },
    };

    setProcurements([newProcurement, ...procurements]);
    enqueueSnackbar("Procurement created successfully", { variant: "success" });
    setValues(initialValues);
    handleClose();
  };

  return (
    <Dialog
      open={openModal}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Create New Procurement</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Product"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  required
                  error={!!errors.title}
                  helperText={errors.title}
                >
                  {PRODUCT_TITLES.map((title) => (
                    <MenuItem key={title} value={title}>
                      {title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Supplier"
                  name="supplierId"
                  value={values.supplierId}
                  onChange={handleChange}
                  required
                  error={!!errors.supplierId}
                  helperText={errors.supplierId}
                >
                  {exportSuppliers.map((supplier) => (
                    <MenuItem key={supplier.id} value={supplier.id}>
                      {supplier.companyName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Sub Region"
                  name="subRegion"
                  value={values.subRegion}
                  onChange={handleChange}
                  required
                  error={!!errors.subRegion}
                  helperText={errors.subRegion}
                >
                  {SUB_REGIONS.map((region) => (
                    <MenuItem key={region} value={region}>
                      {region}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Amount Spent"
                  name="amountSpent"
                  value={values.amountSpent}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 0 }}
                  error={!!errors.amountSpent}
                  helperText={errors.amountSpent}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Quantity"
                  name="quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 1 }}
                  error={!!errors.quantity}
                  helperText={errors.quantity}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Carbon Emissions (kg)"
                  name="environmentalImpact.carbonEmissions"
                  value={values.environmentalImpact.carbonEmissions}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 0 }}
                  error={!!errors.environmentalImpact?.carbonEmissions}
                  helperText={errors.environmentalImpact?.carbonEmissions}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Sustainability Score (1-5)"
                  name="environmentalImpact.sustainabilityScore"
                  value={values.environmentalImpact.sustainabilityScore}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 1, max: 5 }}
                  error={!!errors.environmentalImpact?.sustainabilityScore}
                  helperText={errors.environmentalImpact?.sustainabilityScore}
                />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProcurementCreate;
