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
import {
  ORDER_STATUS_CANCELED,
  ORDER_STATUS_DELIVERED,
} from "@/constants/order-status";
import { PAY_STATUS_PAID } from "@/constants/payment-status";
import { CancelOrderDialog } from "../components/cancel-order-dialog";
import { UpdatePayStatusDialog } from "../components/update-pay-status-dialog";

export const OrderDetailsView = ({
  data,
  isLoading,
  isError,
  formik,
  isOpenUpdatePayment,
  isOpenCancelOrder,
  isLoadingUpdatePayment,
  isLoadingCancelOrder,
  handleOpenCloseUpdatePayment,
  handleOpenCloseCancelOrder,
  handleUpdatePaymentStatus,
  handleCancelOrder,
}) => {
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
                gap={2}
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
                <Stack direction="row" spacing={2}>
                  {![ORDER_STATUS_DELIVERED, ORDER_STATUS_CANCELED].includes(
                    data.orderStatus
                  ) && (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={handleOpenCloseCancelOrder}
                    >
                      Cancel Order
                    </Button>
                  )}
                  {data.paymentDetails.paymentStatus !== PAY_STATUS_PAID && (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={handleOpenCloseUpdatePayment}
                    >
                      Update Payment Status
                    </Button>
                  )}
                </Stack>
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
      {isOpenCancelOrder && (
        <CancelOrderDialog
          open={isOpenCancelOrder}
          handleOpenClose={handleOpenCloseCancelOrder}
          handleConfirm={handleCancelOrder}
          isLoading={isLoadingCancelOrder}
        />
      )}
      {isOpenUpdatePayment && (
        <UpdatePayStatusDialog
          open={isOpenUpdatePayment}
          formik={formik}
          handleOpenClose={handleOpenCloseUpdatePayment}
          handleConfirm={handleUpdatePaymentStatus}
          isLoading={isLoadingUpdatePayment}
        />
      )}
    </>
  );
};
