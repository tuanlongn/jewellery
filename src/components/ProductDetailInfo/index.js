import React from "react";
import NumberFormat from "react-number-format";
import { Space, Button, Rate, InputNumber } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import "./styles.less";
//-----------------------------------------------

const ProductDetailInfo = ({
  title,
  price,
  onSelectedQuantity,
  addToCart,
  buyNow,
}) => {
  return (
    <div className="product-detail-info">
      <h4>{title}</h4>
      <Rate defaultValue={3} />
      <InputNumber
        size="large"
        min={1}
        defaultValue={1}
        onChange={onSelectedQuantity}
        style={{ width: 60 }}
      />
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
