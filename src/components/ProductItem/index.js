import React from "react";
import ReactResizeDetector from "react-resize-detector";
import NumberFormat from "react-number-format";
import { Card } from "antd";

import Image from "../Image";

import "./styles.less";
//-----------------------------------------------

const ProductItem = ({ title, image, price }) => {
  return (
    <ReactResizeDetector handleWidth>
      {({ width }) => (
        <Card
          hoverable={true}
          style={{ height: width }}
          bodyStyle={{ height: "100%", padding: 10 }}
        >
          <div className="product-item">
            <Image src={image} alt={title} />
            <div className="product-info">
              <div className="product-name">{title}</div>
              <div className="product-price">
                <NumberFormat
                  value={price}
                  displayType={"text"}
                  thousandSeparator="."
                  decimalSeparator=","
                  suffix=" ₫"
                />
              </div>
            </div>
          </div>
        </Card>
      )}
    </ReactResizeDetector>
  );
};

export default React.memo(ProductItem);
