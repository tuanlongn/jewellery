import React from "react";
import { Button, Tooltip } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import "./styles.less";
//-----------------------------------------------

const Header = ({ width }) => {
  return (
    <div className="header">
      <div className="container" style={{ width }}>
        <div className="logo" />
      </div>

      <div className="container" style={{ width }}>
        <ul className="nav">
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

        <div className="">
          <Tooltip title="Giỏ hàng">
            <Button shape="circle" icon={<ShoppingCartOutlined />} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Header;
