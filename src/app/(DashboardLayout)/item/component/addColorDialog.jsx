import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

export const AddColorDialog = ({
  isOpen,
  handleClose,
  color,
  handleChangeColor,
  handleAddVariant,
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Add Variant Color</DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom={true} sx={{ mb: "10px" }}>
          To create a variant for this item, first add the variant colour to
          continue
        </DialogContentText>
        <TextField
          name="VariantColor"
          label="Item Color"
          required
          fullWidth
          value={color}
          onChange={handleChangeColor}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" onClick={handleAddVariant}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
