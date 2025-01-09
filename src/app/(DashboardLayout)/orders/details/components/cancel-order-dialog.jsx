import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const CancelOrderDialog = ({
  open,
  handleOpenClose,
  handleConfirm,
  isLoading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleOpenClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Cancel Order</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to cancel this order? This action cannot be
          undone.
        </DialogContentText>
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
