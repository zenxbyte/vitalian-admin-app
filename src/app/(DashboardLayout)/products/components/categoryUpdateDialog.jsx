import React from "react";
import PropTypes from "prop-types";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FormikProvider } from "formik";

export const CategoryUpdateDialog = ({
  open,
  handleClose,
  formik,
  handleSubmit,
  isLoading,
}) => {
  const { touched, errors, getFieldProps } = formik;

  return (
    <Dialog open={open} fullWidth sx={{ px: 2 }}>
      <DialogTitle>Update Category</DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Category Name*"
                fullWidth
                autoComplete="off"
                variant="outlined"
                {...getFieldProps("catName")}
                error={Boolean(touched.catName && errors.catName)}
                helperText={touched.catName && errors.catName}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Category Description"
                fullWidth
                autoComplete="off"
                variant="outlined"
                {...getFieldProps("catDescription")}
                error={Boolean(touched.catDescription && errors.catDescription)}
                helperText={touched.catDescription && errors.catDescription}
              />
            </Grid>
          </Grid>
        </FormikProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" disabled={isLoading} onClick={handleSubmit}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CategoryUpdateDialog.PropTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
