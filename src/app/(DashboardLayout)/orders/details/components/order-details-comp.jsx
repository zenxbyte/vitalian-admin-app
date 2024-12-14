"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import { formatCurrency } from "@/utils/format-number";
import { fDate } from "@/utils/format-time";

export const OrderDetailsComp = ({ data }) => {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell>{data.orderId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tracking Number</TableCell>
            <TableCell>
              {data.orderDeliveryId ? data.orderDeliveryId : " - "}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ordered Date</TableCell>
            <TableCell>{fDate(data.createdAt)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>{`${data.customer.firstName} ${data.customer.lastName}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Customer Mobile</TableCell>
            <TableCell>{data.customer.phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>{`${data.deliveryInfo.address}, ${data.deliveryInfo.city.city_name}, ${data.deliveryInfo.district.district_name}, ${data.deliveryInfo.postalCode}, ${data.deliveryInfo.country}`}</TableCell>
          </TableRow>
          {data.deliveryInfo.company && (
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>{data.deliveryInfo.company}</TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell>Order Status</TableCell>
            <TableCell>{data.orderStatus}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Payment Status</TableCell>
            <TableCell>{data.paymentDetails.paymentStatus}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Items</TableCell>
            <TableCell>{data.items.length}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Amount</TableCell>
            <TableCell>{formatCurrency(data.orderTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
