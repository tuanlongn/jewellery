import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Button, Tooltip, Dropdown, Menu, InputNumber, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import Money from "../Money";
import Image from "../Image";

import "./styles.less";
//-----------------------------------------------

const Cart = ({ items, onChangeQuantity }) => {
  const [visible, setVisible] = useState(false);

  const cartContent = useMemo(
    () =>
      items.length > 0 ? (
        <Menu onMouseLeave={() => setVisible(false)}>
          {items.map((p) => (
            <Menu.Item key={p.id}>
              <div className="cart-popup-item">
                <div className="info">
                  <div className="image">
                    <Image src={p.image} alt={p.title} />
                  </div>
                  <div className="title">{p.title}</div>
                </div>
                <div className="money">
                  <div className="price">
                    <Money value={p.price} />
                  </div>
                  <div className="quantity">
                    <InputNumber
                      size="small"
                      min={1}
                      defaultValue={p.quantity}
                      onChange={
                        onChangeQuantity
                          ? (value) => onChangeQuantity(p.id, value)
                          : null
                      }
                      style={{ width: 50 }}
                    />
                  </div>
                  <div className="total">
                    <Money value={p.price * p.quantity} />
                  </div>
                </div>
              </div>
            </Menu.Item>
          ))}

          <div className="cart-total">
            <div className="label">Tổng tiền</div>
            <div className="value">
              <Money
                value={
                  items.map((p) => p.price * p.quantity).length > 0 &&
                  items.map((p) => p.price * p.quantity).reduce((a, b) => a + b)
                }
              />
            </div>
          </div>

          <Menu.Divider />
          <Menu.Item>
            <Link href="/order">
              <a>
                <Button type="primary" block>
                  Đặt hàng
                </Button>
              </a>
            </Link>
          </Menu.Item>
        </Menu>
      ) : (
        <Menu onMouseLeave={() => setVisible(false)}>
          <Menu.Item>Bạn chưa có sản phẩm nào trong giỏ hàng</Menu.Item>
        </Menu>
      ),
    [items]
  );

  return (
    <Dropdown
      icon={<ShoppingCartOutlined />}
      overlay={cartContent}
      placement="bottomRight"
      visible={visible}
      onVisibleChange={() => setVisible(true)}
    >
      <Tooltip title="Giỏ hàng">
        <Badge
          count={
            items.length > 0 &&
            items.map((p) => p.quantity).reduce((a, b) => a + b)
          }
        >
          <Button
            size="large"
            type="dashed"
            shape="round"
            icon={<ShoppingCartOutlined style={{ fontSize: 16 }} />}
          >
            Giỏ hàng
          </Button>
        </Badge>
      </Tooltip>
    </Dropdown>
  );
};

export default React.memo(Cart);
