import React from "react";
import { InputNumber, Divider } from "antd";

import Image from "../Image";
import Money from "../Money";

import "./styles.less";
import { AGE_VALUES, TYPE_VALUES, COLOR_VALUES } from "../../common/constants";
//-----------------------------------------------

const CartItem = ({ id, title, image, price, age, type, color, quantity }) => {
  return (
    <div className="cart-item">
      <div className="summary">
        <div className="image">
          <Image src={image} alt={title} />
        </div>
        <div className="info">
          <h4>{title}</h4>
          {age && (
            <div className="attribute">
              <div className="label">Tuổi vàng:</div>
              <div className="value">{age}</div>
            </div>
          )}
          {type && (
            <div className="attribute">
              <div className="label">Loại đá:</div>
              <div className="value">{type}</div>
            </div>
          )}
          {color && (
            <div className="attribute">
              <div className="label">Màu sắc:</div>
              <div className="value">{color}</div>
            </div>
          )}
        </div>
      </div>
      <div className="money">
        <div className="price">
          <Money value={price} />
        </div>
        <InputNumber
          size="large"
          min={1}
          defaultValue={quantity}
          style={{ width: 60 }}
        />
      </div>
    </div>
  );
};

export default React.memo(CartItem);
