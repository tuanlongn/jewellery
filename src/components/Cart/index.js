import React, { useState } from "react";
import { Button, Tooltip, Dropdown, Menu, InputNumber, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import Money from "../Money";
import Image from "../Image";

import "./styles.less";
//-----------------------------------------------

const Cart = ({ items, onChangeQuantity }) => {
  const [visible, setVisible] = useState(false);

  const cartContent = items ? (
    <Menu onMouseLeave={() => setVisible(false)}>
      {Object.keys(items).map((pid) => {
        const p = items[pid];
        return (
          <Menu.Item key={pid}>
            <div className="cart-item">
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
                        ? (value) => onChangeQuantity(pid, value)
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
        );
      })}

      <Menu.Divider />
      <Menu.Item>
        <div className="cart-total">
          <div className="label">Tổng tiền</div>
          <div className="value">
            <Money
              value={
                Object.keys(items).map(
                  (pid) => items[pid].price * items[pid].quantity
                ).length > 0 &&
                Object.keys(items)
                  .map((pid) => items[pid].price * items[pid].quantity)
                  .reduce((a, b) => a + b)
              }
            />
          </div>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Button type="primary" block>
          Đặt hàng
        </Button>
      </Menu.Item>
    </Menu>
  ) : (
    <Menu onMouseLeave={() => setVisible(false)}>
      <Menu.Item>Bạn chưa có sản phẩm nào trong giỏ hàng</Menu.Item>
    </Menu>
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
            Object.keys(items).length > 0 &&
            Object.keys(items)
              .map((pid) => items[pid].quantity)
              .reduce((a, b) => a + b)
          }
        >
          <Button
            size="large"
            type="dashed"
            shape="round"
            icon={<ShoppingCartOutlined style={{ fontSize: 20 }} />}
          >
            Giỏ hàng
          </Button>
        </Badge>
      </Tooltip>
    </Dropdown>
  );
};

export default React.memo(Cart);
