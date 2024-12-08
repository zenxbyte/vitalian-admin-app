"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const headers = ["PRODUCT", "TITLE", "COLOR", "SIZE", "QUANTITY"];

const CustomTableCell = ({ props, children }) => {
  return (
    <TableCell {...props} sx={{ borderBottom: 1 }}>
      {children}
    </TableCell>
  );
};

export const OrderItemsComp = ({ data }) => {
  return (
    <TableContainer sx={{ overflowY: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((item, index) => (
              <CustomTableCell
                key={index}
                align={index === headers.length - 1 ? "right" : "inherit"}
              >
                {item}
              </CustomTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items.map((row, index) => (
            <TableRow key={index}>
              <CustomTableCell>
                <img
                  src={row.variant.variantImages[0].imgUrl}
                  width={90}
                  height={120}
                />
              </CustomTableCell>
              <CustomTableCell>
                {row.variant.variantProduct.itemTitle}
              </CustomTableCell>
              <CustomTableCell>{row.variant.variantColor}</CustomTableCell>
              <CustomTableCell>{row.size}</CustomTableCell>
              <CustomTableCell align="right">{row.quantity}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
