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
              <CustomTableCell>Availability</CustomTableCell>
              <CustomTableCell>Quantity</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <CustomTableCell>XS</CustomTableCell>
              <CustomTableCell>
                <Chip
                  color={data.xsAvailable ? "success" : "warning"}
                  label={data.xsAvailable ? "Available" : "Not Available"}
                />
              </CustomTableCell>
              <CustomTableCell>{data.xsQuantity}</CustomTableCell>
            </TableRow>
            <TableRow>
              <CustomTableCell>XS</CustomTableCell>
              <CustomTableCell>
                <Chip
                  color={data.sAvailable ? "success" : "warning"}
                  label={data.sAvailable ? "Available" : "Not Available"}
                />
              </CustomTableCell>
              <CustomTableCell>{data.sQuantity}</CustomTableCell>
            </TableRow>
            <TableRow>
              <CustomTableCell>XS</CustomTableCell>
              <CustomTableCell>
                <Chip
                  color={data.mAvailable ? "success" : "warning"}
                  label={data.mAvailable ? "Available" : "Not Available"}
                />
              </CustomTableCell>
              <CustomTableCell>{data.mQuantity}</CustomTableCell>
            </TableRow>
            <TableRow>
              <CustomTableCell>XS</CustomTableCell>
              <CustomTableCell>
                <Chip
                  color={data.lAvailable ? "success" : "warning"}
                  label={data.lAvailable ? "Available" : "Not Available"}
                />
              </CustomTableCell>
              <CustomTableCell>{data.lQuantity}</CustomTableCell>
            </TableRow>
            <TableRow>
              <CustomTableCell>XS</CustomTableCell>
              <CustomTableCell>
                <Chip
                  color={data.xlAvailable ? "success" : "warning"}
                  label={data.xlAvailable ? "Available" : "Not Available"}
                />
              </CustomTableCell>
              <CustomTableCell>{data.xlQuantity}</CustomTableCell>
            </TableRow>
            <TableRow>
              <CustomTableCell>XS</CustomTableCell>
              <CustomTableCell>
                <Chip
                  color={data.xxlAvailable ? "success" : "warning"}
                  label={data.xxlAvailable ? "Available" : "Not Available"}
                />
              </CustomTableCell>
              <CustomTableCell>{data.xxlQuantity}</CustomTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
