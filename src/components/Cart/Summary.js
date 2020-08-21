import React, { useMemo } from "react";

import Money from "../Money";

import "./styles.less";
//-----------------------------------------------

const CartSummary = ({ items }) => {
  const total = useMemo(() => {
    if (items.length > 0) {
      return items.map((p) => p.price * p.quantity).reduce((a, b) => a + b);
    }
    return 0;
  }, [items]);

  return (
    <div className="cart-summary">
      <div className="label">Thành tiền</div>
      <div className="money">
        <Money value={total} />
      </div>
    </div>
  );
};
export default React.memo(CartSummary);
