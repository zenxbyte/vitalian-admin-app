import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_DELIVERY_CREATED,
  ORDER_STATUS_OUT_DELIVERY,
  ORDER_STATUS_PACKED,
  ORDER_STATUS_PENDING,
} from "@/constants/order-status";

export const UpdateStatusDialog = ({
  open,
  filter,
  handleOpenClose,
  handleConfirm,
  isLoading,
}) => {
  const filterChangeTo = () => {
    switch (filter) {
      case ORDER_STATUS_PENDING:
        return ORDER_STATUS_PACKED;
      case ORDER_STATUS_DELIVERY_CREATED:
        return ORDER_STATUS_OUT_DELIVERY;
      case ORDER_STATUS_OUT_DELIVERY:
        return ORDER_STATUS_DELIVERED;
      default:
        return "None";
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleOpenClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Update Status Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to update the status of this orders? This action
          cannot be undone. From <b>{filter}</b> to <b>{filterChangeTo()}</b>
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
