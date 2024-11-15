import React from "react";
import { NumericFormat } from "react-number-format";
import { TextField } from "@mui/material";

export const CurrencyInput = (props) => {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      customInput={TextField}
      variant="outlined"
      onValueChange={(values) => {
        const { value } = values;
        onChange({
          target: {
            name: props.name,
            value: value === null ? "0" : value,
          },
        });
      }}
      thousandSeparator
      prefix="Rs. "
      {...other}
    />
  );
};
