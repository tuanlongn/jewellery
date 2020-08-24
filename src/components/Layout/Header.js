import React, { useState, useMemo } from "react";
import Link from "next/link";

import "./styles.less";
import Cart from "../Cart";
//-----------------------------------------------

const Header = ({ width, cart }) => {
  return (
    <div className="header">
      <div className="container" style={{ width }}>
        <div className="logo" />
      </div>

      <div className="nav" style={{ width }}>
        <ul>
          {["Quà tặng cao cấp", "Trang sức", "Kim cương", "Đồng Hồ"].map(
            (label) => (
              <li key={label}>
                <Link href="/">
                  <a className={`${label === "Trang sức" ? "active" : ""}`}>
                    {label}
                  </a>
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="cart">
          {cart && (
            <Cart
              items={cart.items}
              onChangeQuantity={cart.updateItem}
              onRemoveItem={cart.removeItem}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
