import React from "react";
import { Typography, Button, Stack, TextField } from "@mui/material";

const AuthLogin = ({ title, subtext, handleLogin }) => (
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
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        fullWidth
      />
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        type="submit"
        onClick={handleLogin}
      >
        Sign In
      </Button>
    </Stack>
  </>
);

export default AuthLogin;
