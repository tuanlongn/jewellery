import React, { useState } from "react";
import {
  Button,
  Tooltip,
  Dropdown,
  Menu,
  Divider,
  InputNumber,
  Badge,
} from "antd";

import "./styles.less";
import Cart from "../Cart";
//-----------------------------------------------

const Header = ({ width, cart, onChangeQuantity }) => {
  return (
    <div className="header">
      <div className="container" style={{ width }}>
        <div className="logo" />
      </div>

      <div className="nav" style={{ width }}>
        <ul>
          <li>
            <a>Quà tặng cao cấp</a>
          </li>
          <li>
            <a className="active">Trang sức</a>
          </li>
          <li>
            <a>Kim cương</a>
          </li>
          <li>
            <a>Đồng Hồ</a>
          </li>
        </ul>

        <div className="cart">
          <Cart items={cart.items} onChangeQuantity={onChangeQuantity} />
        </div>
      </div>
    </div>
  );
};

export default Header;
