import {
  Box,
  Chip,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import React from "react";

const CustomTableCell = ({ children }) => {
  return <TableCell align="center">{children}</TableCell>;
};

export const SizeComponent = ({ data }) => {
  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "lightblue", color: "white" }}>
              <CustomTableCell>Size</CustomTableCell>
              <CustomTableCell>Quantity</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.variantSizes.map((item, index) => (
              <TableRow key={index}>
                <CustomTableCell>{item.size}</CustomTableCell>
                <CustomTableCell>{item.quantity}</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
