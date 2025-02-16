import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem,
  Rating,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import { useSupplier } from "src/hooks/useSupplier";
import { useSnackbar } from "notistack";
import { country } from "src/utils/mock-data/address";

interface SupplierCreateProps {
  openModal: boolean;
  handleClose: () => void;
}

const STATUS_OPTIONS = ["active", "inactive"];

interface FormErrors {
  companyName?: string;
  contactPerson?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  country?: string;
  rating?: string;
}

const SupplierCreate: React.FC<SupplierCreateProps> = ({
  openModal,
  handleClose,
}) => {
  const { setSuppliers } = useSupplier();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = React.useState({
    companyName: "",
    contactPerson: {
      name: "",
      email: "",
      phone: "",
    },
    country: "",
    rating: 0,
    status: "active",
  });
  const [errors, setErrors] = React.useState<FormErrors>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev: any) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Company Name validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
      isValid = false;
    }

    // Contact Person validations
    const contactErrors: FormErrors['contactPerson'] = {};
    
    if (!formData.contactPerson.name.trim()) {
      contactErrors.name = 'Contact person name is required';
      isValid = false;
    }

    if (!formData.contactPerson.email.trim()) {
      contactErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.contactPerson.email)) {
      contactErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (!formData.contactPerson.phone.trim()) {
      contactErrors.phone = 'Phone number is required';
      isValid = false;
    }

    if (Object.keys(contactErrors).length > 0) {
      newErrors.contactPerson = contactErrors;
    }

    // Country validation
    if (!formData.country) {
      newErrors.country = 'Country is required';
      isValid = false;
    }

    // Rating validation
    if (formData.rating === 0) {
      newErrors.rating = 'Please provide a rating';
      isValid = false;
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

    // Create new supplier object
    const newSupplier = {
      id: `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${Math.random() * 1000}`,
      ...formData,
    };

    // Update suppliers list
    setSuppliers((prev: any[]) => [...prev, newSupplier]);
    
    enqueueSnackbar("Supplier created successfully", { variant: "success" });
    handleClose();
    // Reset form and errors
    setFormData({
      companyName: "",
      contactPerson: {
        name: "",
        email: "",
        phone: "",
      },
      country: "",
      rating: 0,
      status: "active",
    });
    setErrors({});
  };

  return (
    <Dialog
      open={openModal}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Create New Supplier</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              error={!!errors.companyName}
              helperText={errors.companyName}
            />

            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Contact Person Details
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Contact Person Name"
                name="contactPerson.name"
                value={formData.contactPerson.name}
                onChange={handleChange}
                required
                error={!!errors.contactPerson?.name}
                helperText={errors.contactPerson?.name}
              />
              <TextField
                fullWidth
                label="Email"
                name="contactPerson.email"
                type="email"
                value={formData.contactPerson.email}
                onChange={handleChange}
                required
                error={!!errors.contactPerson?.email}
                helperText={errors.contactPerson?.email}
              />
              <TextField
                fullWidth
                label="Phone"
                name="contactPerson.phone"
                value={formData.contactPerson.phone}
                onChange={handleChange}
                required
                error={!!errors.contactPerson?.phone}
                helperText={errors.contactPerson?.phone}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl fullWidth error={!!errors.country}>
                <InputLabel>Country</InputLabel>
                <Select
                  value={formData.country}
                  label="Country"
                  name="country"
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  required
                >
                  {country.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
                {errors.country && (
                  <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                    {errors.country}
                  </Typography>
                )}
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  name="status"
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={(_, newValue) => {
                  setFormData(prev => ({ ...prev, rating: newValue || 0 }));
                }}
              />
              {errors.rating && (
                <Typography variant="caption" color="error">
                  {errors.rating}
                </Typography>
              )}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Create Supplier
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SupplierCreate;
