"use client";
import { Box, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Typography>Dashboard</Typography>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
