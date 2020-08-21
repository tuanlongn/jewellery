import React from "react";
import ReactResizeDetector from "react-resize-detector";
import { Card } from "antd";

import Image from "../Image";
import Money from "../Money";

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
            <div className="image">
              <Image src={image} alt={title} />
            </div>
            <div className="info">
              <div className="name">{title}</div>
              <div className="price">
                <Money value={price} />
              </div>
            </div>
          </div>
        </Card>
      )}
    </ReactResizeDetector>
  );
};

export default React.memo(ProductItem);
