import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SIZES } from "@/constants/size-constants";

export const SelectSizeDialog = ({ isOpen, handleClose, handleSelect }) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Select Size</DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom>
          To add a size, please select s size from the below list and continue.
        </DialogContentText>
        <FormControl fullWidth>
          <InputLabel id="select-label">Size Variant</InputLabel>
          <Select
            labelId="select-label"
            id="demo-simple-select"
            label="Size Variant"
            onChange={handleSelect}
          >
            {SIZES.map((size, index) => (
              <MenuItem value={size.value} key={index}>
                {size.key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Continue</Button>
      </DialogActions>
    </Dialog>
  );
};
