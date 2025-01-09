import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { PAYMENT_STATUS } from "@/constants/payment-status";

export const UpdatePayStatusDialog = ({
  open,
  formik,
  handleOpenClose,
  handleConfirm,
  isLoading,
}) => {
  const { touched, errors, values, setFieldValue } = formik;

  const handleSelect = (e) => {
    setFieldValue("newStatus", e.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleOpenClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Update Payment Status</DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom>
          Are you sure you want to update the payment status of this order?
        </DialogContentText>
        <FormControl fullWidth sx={{ mt: "5px" }}>
          <InputLabel id="select-label">Payment Status</InputLabel>
          <Select
            labelId="select-label"
            value={values.newStatus}
            label="Age"
            onChange={handleSelect}
          >
            {PAYMENT_STATUS.map((status, index) => (
              <MenuItem key={index} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
          {errors.newStatus && touched.newStatus && (
            <FormHelperText>{errors.newStatus}</FormHelperText>
          )}
        </FormControl>
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
