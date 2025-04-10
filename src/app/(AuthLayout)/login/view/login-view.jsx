"use client";
import Link from "next/link";
import { Box, Card, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
// components
import Logo from "@/layouts/shared/logo/Logo.jsx";
import PageContainer from "@/components/container/PageContainer.jsx";
import AuthLogin from "../component/authLogin.jsx";

export const LoginView = ({ formik, isLoading, handleLogin }) => {
  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            size={{ xs: 12, md: 4 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{
                p: 4,
                zIndex: 1,
                width: "100%",
                maxWidth: "500px",
                height: "auto",
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <img
                  src="/images/logos/VITALIAN-LOGO-DARK.png"
                  alt="logo"
                  style={{ width: "120px", height: "auto" }}
                />
              </Box>
              <AuthLogin
                handleLogin={handleLogin}
                isLoading={isLoading}
                formik={formik}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
