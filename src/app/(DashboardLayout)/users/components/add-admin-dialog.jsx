import PasswordField from "@/components/password-field/password-field";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FormikProvider } from "formik";

export const AddAdminDialog = ({
  open,
  formik,
  isLoading,
  handleOpenClose,
  handleConfirm,
}) => {
  const { touched, errors, getFieldProps } = formik;
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Add New Admin</DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="First Name"
                required={true}
                fullWidth
                autoComplete="off"
                variant="outlined"
                {...getFieldProps("userFirstName")}
                error={Boolean(touched.userFirstName && errors.userFirstName)}
                helperText={touched.userFirstName && errors.userFirstName}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Last Name"
                required={true}
                fullWidth
                autoComplete="off"
                variant="outlined"
                {...getFieldProps("userLastName")}
                error={Boolean(touched.userLastName && errors.userLastName)}
                helperText={touched.userLastName && errors.userLastName}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Email"
                required={true}
                fullWidth
                autoComplete="off"
                variant="outlined"
                {...getFieldProps("userEmail")}
                error={Boolean(touched.userEmail && errors.userEmail)}
                helperText={touched.userEmail && errors.userEmail}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <PasswordField
                label="Password"
                required={true}
                fullWidth
                autoComplete="off"
                variant="outlined"
                {...getFieldProps("userPassword")}
                error={Boolean(touched.userPassword && errors.userPassword)}
                helperText={touched.userPassword && errors.userPassword}
              />
            </Grid>
          </Grid>
        </FormikProvider>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleOpenClose}
          disabled={isLoading}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={isLoading}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
