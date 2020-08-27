import React from "react";
import { Space, Button, Rate, InputNumber, Divider } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import Money from "../Money";

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
      <div className="rate">
        <Rate defaultValue={4} />
      </div>

      <Divider />

      <div className="variant">
        <div className="variant-attribute">
          <div className="label">Màu sắc</div>
          <Space>
            <Button shape="circle" style={{ backgroundColor: "#E91E63" }}>
              {" "}
            </Button>
            <Button shape="circle" style={{ backgroundColor: "#FFC107" }}>
              {" "}
            </Button>
            <Button shape="circle" style={{ backgroundColor: "#cacacaa6" }}>
              {" "}
            </Button>
          </Space>
        </div>
        <div className="variant-attribute">
          <div className="label">Kích thước</div>
          <Space>
            {[16, 17, 18, 19, 20].map((size) => (
              <Button key={size.toString()}>{size}</Button>
            ))}
          </Space>
        </div>
      </div>

      <Divider />

      <div className="quantity">
        <InputNumber
          size="large"
          min={1}
          defaultValue={1}
          onChange={onSelectedQuantity}
          style={{ width: 60 }}
        />
      </div>

      <div className="price">
        <Money value={price} />
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
        <Button
          type="danger"
          shape="round"
          size="large"
          className="buy-now"
          style={{ width: 200 }}
          onClick={buyNow}
        >
          Mua ngay
        </Button>
      </Space>
    </div>
  );
};

export default React.memo(ProductDetailInfo);
