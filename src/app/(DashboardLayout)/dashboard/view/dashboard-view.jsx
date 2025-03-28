"user client";

import PageContainer from "@/components/container/PageContainer.jsx";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import PendingIcon from "@mui/icons-material/Pending";
import InventoryIcon from "@mui/icons-material/Inventory";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { RecentTransactions } from "../components/recent-transactions";
import { RecentOrders } from "../components/recent-orders";
import { StatCard } from "@/components/stat-card/stat-card";
import { RecentPickUpOrders } from "../components/recent-pickup-orders";

export const DashboardView = ({
  isLoadingTransactions,
  isLoadingRecentOrds,
  transactions,
  recentOrders,
  recentPickups,
  recentOrdCount,
  countPending,
  countPacked,
  countReady,
  countWaiting,
  isLoadingRecentPickups,
  isLoadingCountPending,
  isLoadingCountPacked,
  isLoadingCountReady,
  isLoadingCountWaiting,
}) => {
  return (
    <PageContainer title="Dashboard">
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ sm: 8, xs: 12 }}>
            <Grid container spacing={2}>
              <Grid size={{ sm: 6, xs: 12 }}>
                <StatCard
                  title={"Pending Orders"}
                  icon={<PendingIcon fontSize="large" color="info" />}
                  data={countPending}
                  isLoading={isLoadingCountPending}
                />
              </Grid>
              <Grid size={{ sm: 6, xs: 12 }}>
                <StatCard
                  title={"Packed Orders"}
                  icon={<InventoryIcon fontSize="large" color="info" />}
                  data={countPacked}
                  isLoading={isLoadingCountPacked}
                />
              </Grid>
              <Grid size={{ sm: 6, xs: 12 }}>
                <StatCard
                  title={"Delivery Ready"}
                  icon={<BeenhereIcon fontSize="large" color="success" />}
                  data={countReady}
                  isLoading={isLoadingCountReady}
                />
              </Grid>
              {/* <Grid size={{ sm: 6, xs: 12 }}>
                <StatCard
                  title={"Awaiting Pick Up"}
                  icon={<LocalShippingIcon fontSize="large" color="warning" />}
                  data={countWaiting}
                  isLoading={isLoadingCountWaiting}
                />
              </Grid> */}
            </Grid>
          </Grid>
          <Grid size={{ sm: 4, xs: 12 }}>
            <RecentPickUpOrders
              isLoading={isLoadingRecentPickups}
              data={recentPickups}
            />
          </Grid>
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
