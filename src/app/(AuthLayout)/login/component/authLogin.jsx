import React from "react";
import { Typography, Button, Stack, TextField } from "@mui/material";

const AuthLogin = ({ title, subtext, formik, isLoading, handleLogin }) => {
  const { touched, errors, getFieldProps } = formik;

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack direction="column" spacing={2} sx={{ p: "20px 5px" }}>
        <TextField
          type="email"
          label="User name / Email"
          variant="outlined"
          fullWidth
          {...getFieldProps("userEmail")}
          error={Boolean(touched.userEmail && errors.userEmail)}
          helperText={touched.userEmail && errors.userEmail}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          {...getFieldProps("userPassword")}
          error={Boolean(touched.userPassword && errors.userPassword)}
          helperText={touched.userPassword && errors.userPassword}
        />
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={isLoading}
          onClick={handleLogin}
        >
          Sign In
        </Button>
      </Stack>
    </>
  );
};

export default AuthLogin;
