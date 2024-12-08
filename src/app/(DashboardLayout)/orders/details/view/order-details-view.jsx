"use client";

import { formatCurrency } from "@/utils/format-number";
import { fDate } from "@/utils/format-time";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { OrderDetailsComp } from "../components/order-details-comp";
import { OrderItemsComp } from "../components/order-items-comp";

export const OrderDetailsView = ({ data, isLoading, isError }) => {
  return (
    <>
      {!isLoading && data && (
        <Container>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Box
                display="flex"
                flexWrap="wrap"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Breadcrumbs aria-label="breadcrumb" separator=" > ">
                  <Link underline="hover" color="inherit" href="/orders">
                    Back
                  </Link>
                  <Typography sx={{ color: "text.primary" }}>
                    {data.orderId}
                  </Typography>
                </Breadcrumbs>
                <Button variant="contained">Update</Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 5 }}>
              <Card>
                <CardContent>
                  <OrderDetailsComp data={data} />
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 7 }}>
              <Card>
                <CardContent>
                  <OrderItemsComp data={data} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};
