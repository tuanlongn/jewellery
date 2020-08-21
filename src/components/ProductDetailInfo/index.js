import React from "react";
import NumberFormat from "react-number-format";
import { Space, Button, Rate } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import "./styles.less";
//-----------------------------------------------

const ProductDetailInfo = ({ title, price, addToCart, buyNow }) => {
  return (
    <div className="product-detail-info">
      <h4>{title}</h4>
      <Rate defaultValue={3} />
      <div className="price">
        <NumberFormat
          value={price}
          displayType={"text"}
          thousandSeparator="."
          decimalSeparator=","
          suffix=" ₫"
        />
      </div>

      <Space>
        <Button
          shape="round"
          size="large"
          icon={<ShoppingCartOutlined />}
          onClick={addToCart}
        >
          Thêm vào giỏ hàng
        </Button>
        <Button type="danger" shape="round" size="large" onClick={buyNow}>
          Mua ngay
        </Button>
      </Space>
    </div>
  );
};

export default React.memo(ProductDetailInfo);
