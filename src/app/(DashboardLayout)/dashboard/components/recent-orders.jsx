import {
  Box,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import TableEmptyRow from "@/components/custom-table/table-empty-row.jsx";
import TableLoadingRow from "@/components/custom-table/table-loading-row.jsx";
import { formatCurrency } from "@/utils/format-number";
import { fDate } from "@/utils/format-time";

const headers = [
  "Order No",
  "Customer",
  "Total Price",
  "Payment Status",
  "Ordered On",
];

export const RecentOrders = ({ data, isLoading, count }) => {
  return (
    <Card sx={{ padding: 0 }} elevation={9} variant={undefined}>
      <CardContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Recent Pending Orders</Typography>
            <Typography>
              {isLoading ? "Loading..." : `${count} Orders`}
            </Typography>
          </Box>

          <TableContainer sx={{ overflow: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((title, index) => (
                    <TableCell key={index}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {title}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading && <TableLoadingRow colSpan={headers.length} />}
                {!isLoading && data.length === 0 && (
                  <TableEmptyRow colSpan={headers.length} />
                )}
                {!isLoading && data.length > 0 && (
                  <>
                    {data.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: "500",
                            }}
                          >
                            {row.orderId}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Box>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {`${row.customer.firstName} ${row.customer.lastName}`}
                              </Typography>
                              <Typography
                                color="textSecondary"
                                sx={{
                                  fontSize: "13px",
                                }}
                              >
                                {row.customer.phone}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {formatCurrency(row.orderTotal)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            sx={{
                              px: "4px",
                              backgroundColor: "#5D87FF",
                              color: "#fff",
                            }}
                            size="small"
                            label={row.paymentDetails.paymentStatus}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography>{fDate(row.createdAt)}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
    </Card>
  );
};
