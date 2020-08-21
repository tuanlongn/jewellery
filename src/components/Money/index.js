import React from "react";
import NumberFormat from "react-number-format";

const Money = ({ value }) => {
  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator="."
      decimalSeparator=","
      suffix=" ₫"
    />
  );
};

export default React.memo(Money);
