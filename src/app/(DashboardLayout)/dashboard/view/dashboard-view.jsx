"user client";

import PageContainer from "@/components/container/PageContainer.jsx";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { RecentTransactions } from "../components/recent-transactions";
import { RecentOrders } from "../components/recent-orders";

export const DashboardView = ({
  isLoadingTransactions,
  isLoadingRecentOrds,
  transactions,
  recentOrders,
  recentOrdCount,
}) => {
  return (
    <PageContainer title="Dashboard">
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ sm: 4, xs: 12 }}>
            <RecentTransactions
              data={transactions}
              isLoading={isLoadingTransactions}
            />
          </Grid>
          <Grid size={{ sm: 8, xs: 12 }}>
            <RecentOrders
              data={recentOrders}
              count={recentOrdCount}
              isLoading={isLoadingRecentOrds}
            />
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
};
