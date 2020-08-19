import React from "react";
import { Space, Button } from "antd";

import "./styles.less";
//-----------------------------------------------

const ProductDetailInfo = ({ title, price, addToCart, buyNow }) => {
  return (
    <div className="product-detail-info">
      <h4>{title}</h4>
      <div className="price">{price}</div>

      <Space>
        <Button type="primary" shape="round" size="large" onClick={addToCart}>
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
