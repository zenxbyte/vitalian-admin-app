"use client";

import React, { Fragment } from "react";
import PageContainer from "@/components/container/PageContainer.jsx";
import {
  Card,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CustomTableHead } from "@/components/custom-table/custom-table-head";
import { ORDER_STATUS } from "@/constants/order-status";
import { PAYMENT_STATUS } from "@/constants/payment-status";
import { SORT_BY } from "@/constants/sort-constants";
import TableLoadingRow from "@/components/custom-table/table-loading-row";
import TableEmptyRow from "@/components/custom-table/table-empty-row";
import { formatCurrency } from "@/utils/format-number";
import { fDate } from "@/utils/format-time";

const headers = [
  "OrderId",
  "Customer Name",
  "Customer Mobile",
  "City",
  "District",
  "Total Value",
  "Payment Status",
  "Order Status",
  "Placed on",
];

export const OrderView = ({
  data,
  isLoading,
  selectedFilters,
  handleSelectOptions,
  handleChangeSearch,
  deleteFilter,
  handleOnClickRow,
  limit,
  page,
  documentCount,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <PageContainer title="Order">
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              autoComplete="off"
              name="orderId"
              label="Search Order Id"
              value={selectedFilters.orderId}
              onChange={(event) => {
                handleChangeSearch(event);
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="order-status-select-label">
                Filter By Order Status
              </InputLabel>
              <Select
                labelId="order-status-select-label"
                value={selectedFilters.orderStatus}
                label="Filter By Order Status"
                name="orderStatus"
                onChange={handleSelectOptions}
              >
                {ORDER_STATUS.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="payment-status-select-label">
                Filter By Payment Status
              </InputLabel>
              <Select
                labelId="payment-status-select-label"
                value={selectedFilters.paymentStatus}
                label="Filter By Payment Status "
                name="paymentStatus"
                onChange={handleSelectOptions}
              >
                {PAYMENT_STATUS.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {selectedFilters.orderId && (
                <Chip
                  label={selectedFilters.orderId}
                  onDelete={() => deleteFilter("orderId")}
                />
              )}
              {selectedFilters.orderStatus && (
                <Chip
                  label={selectedFilters.orderStatus}
                  onDelete={() => deleteFilter("orderStatus")}
                />
              )}
              {selectedFilters.paymentStatus && (
                <Chip
                  label={selectedFilters.paymentStatus}
                  onDelete={() => deleteFilter("paymentStatus")}
                />
              )}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="sort-select-label">Sort By</InputLabel>
              <Select
                labelId="sort-select-label"
                value={selectedFilters.sort}
                label="Sort By"
                name="sort"
                onChange={handleSelectOptions}
              >
                {SORT_BY.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }}>
            <Card>
              <TableContainer>
                <Table>
                  <CustomTableHead headLabel={headers} />
                  <TableBody>
                    {isLoading && <TableLoadingRow colSpan={headers.length} />}
                    {!isLoading && data.length === 0 && (
                      <TableEmptyRow colSpan={headers.length} />
                    )}
                    {!isLoading && data.length > 0 && (
                      <>
                        {data.map((item, index) => (
                          <TableRow
                            key={index}
                            onClick={() => handleOnClickRow(item._id)}
                          >
                            <TableCell>{item.orderId}</TableCell>
                            <TableCell>{`${item.customer.firstName} ${item.customer.lastName}`}</TableCell>
                            <TableCell>{item.customer.phone}</TableCell>
                            <TableCell>
                              {item.deliveryInfo.city.city_name}
                            </TableCell>
                            <TableCell>
                              {item.deliveryInfo.district.district_name}
                            </TableCell>
                            <TableCell>
                              {formatCurrency(item.orderTotal)}
                            </TableCell>
                            <TableCell>
                              {item.paymentDetails.paymentStatus}
                            </TableCell>
                            <TableCell>{item.orderStatus}</TableCell>
                            <TableCell>{fDate(item.createdAt)}</TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {data.length > 10 && (
                <TablePagination
                  page={page}
                  component="div"
                  count={documentCount}
                  rowsPerPage={limit}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={[20, 30, 40]}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
};
