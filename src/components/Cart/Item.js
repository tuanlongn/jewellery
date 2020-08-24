import React from "react";
import Link from "next/link";
import { InputNumber, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { slugify } from "../../common/utils";
import Image from "../Image";
import Money from "../Money";

import "./styles.less";
//-----------------------------------------------

const CartItem = ({
  id,
  title,
  category,
  image,
  price,
  age,
  type,
  color,
  quantity,
  onChangeQuantity,
  onRemoveItem,
}) => {
  return (
    <div className="cart-item">
      <Link
        href="/product/[...slug]"
        as={`/product/${slugify(category)}/${slugify(title)}.p${id}`}
      >
        <a className="summary">
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
            <div className="action">
              <Button
                shape="round"
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => onRemoveItem(id)}
              >
                Xoá
              </Button>
            </div>
          </div>
        </a>
      </Link>

      <div className="money">
        <div className="price">
          <Money value={price} />
        </div>
        <InputNumber
          size="large"
          min={1}
          defaultValue={quantity}
          style={{ width: 60 }}
          onChange={
            onChangeQuantity ? (value) => onChangeQuantity(id, value) : null
          }
        />
      </div>
    </div>
  );
};

export default React.memo(CartItem);
