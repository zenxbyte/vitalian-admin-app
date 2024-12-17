import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export const PickupRequestDialog = ({
  open,
  handleOpenClose,
  handleConfirm,
  formik,
  isLoading,
}) => {
  const {
    touched,
    errors,
    getFieldProps,
    values,
    setFieldValue,
    handleChange,
    handleBlur,
  } = formik;

  const handleSelectVehicle = (e) => {
    setFieldValue("vehicleType", e.target.value);
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Request Pickup - Koombiyo
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: "10px" }}>
          <Grid size={{ xl: 6, sm: 12 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="select-label">Vehicle Type</InputLabel>
              <Select
                labelId="select-label"
                id="simple-select"
                label="Vehical Type"
                name="vehicleType"
                value={values.vehicleType}
                onChange={handleSelectVehicle}
                onBlur={handleBlur}
              >
                <MenuItem value="Bike">Bike</MenuItem>
                <MenuItem value="Three wheel">Three wheel</MenuItem>
                <MenuItem value="Lorry">Lorry</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xl: 6, sm: 12 }}>
            <TextField
              name="phone"
              label="Phone Number"
              required
              fullWidth
              {...getFieldProps("phone")}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />
          </Grid>
          <Grid size={{ xl: 6, sm: 12 }}>
            <TextField
              name="pickup_address"
              label="Pickup Address"
              required
              fullWidth
              {...getFieldProps("pickup_address")}
              error={Boolean(touched.pickup_address && errors.pickup_address)}
              helperText={touched.pickup_address && errors.pickup_address}
            />
          </Grid>
          <Grid size={{ xl: 6, sm: 12 }}>
            <TextField
              name="pickup_remark"
              label="Pickup Remark"
              required
              fullWidth
              {...getFieldProps("pickup_remark")}
              error={Boolean(touched.pickup_remark && errors.pickup_remark)}
              helperText={touched.pickup_remark && errors.pickup_remark}
            />
          </Grid>
          <Grid size={{ xl: 6, sm: 12 }}>
            <TextField
              name="latitude"
              label="Latitude"
              type="number"
              required
              fullWidth
              {...getFieldProps("latitude")}
              error={Boolean(touched.latitude && errors.latitude)}
              helperText={touched.latitude && errors.latitude}
            />
          </Grid>
          <Grid size={{ xl: 6, sm: 12 }}>
            <TextField
              name="longitude"
              label="Longitude"
              type="number"
              required
              fullWidth
              {...getFieldProps("longitude")}
              error={Boolean(touched.longitude && errors.longitude)}
              helperText={touched.longitude && errors.longitude}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={handleOpenClose}>
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          variant="contained"
          onClick={handleConfirm}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
