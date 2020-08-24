import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Button, Tooltip, Dropdown, Menu, InputNumber, Badge } from "antd";
import { ShoppingCartOutlined, CloseCircleOutlined } from "@ant-design/icons";

import { slugify } from "../../common/utils";
import Money from "../Money";
import Image from "../Image";

import "./styles.less";
//-----------------------------------------------

const Cart = ({ items, onChangeQuantity, onRemoveItem }) => {
  const [visible, setVisible] = useState(false);

  const totalQuantities = useMemo(() => {
    if (items.length > 0) {
      return items.map((p) => p.quantity).reduce((a, b) => a + b);
    }
    return 0;
  }, [items]);

  const cartContent = useMemo(
    () =>
      items.length > 0 ? (
        <Menu onMouseLeave={() => setVisible(false)}>
          {items.map((p) => (
            <Menu.Item key={p.id}>
              <Link
                href="/product/[...slug]"
                as={`/product/${slugify(p.category)}/${slugify(p.title)}.p${
                  p.id
                }`}
              >
                <a>
                  <div className="cart-popup-item">
                    <CloseCircleOutlined
                      className="close-button"
                      onClick={(e) => {
                        e.preventDefault();
                        onRemoveItem(p.id);
                      }}
                    />
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
                </a>
              </Link>
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
            <Link href="/checkout/shipping">
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
      {totalQuantities ? (
        <Badge count={totalQuantities}>
          <Link href="/checkout/cart">
            <a>
              <Button
                size="large"
                type="dashed"
                shape="round"
                icon={<ShoppingCartOutlined style={{ fontSize: 16 }} />}
              >
                Giỏ hàng
              </Button>
            </a>
          </Link>
        </Badge>
      ) : (
        <Link href="/checkout/cart">
          <a>
            <Button
              size="large"
              type="dashed"
              shape="round"
              icon={<ShoppingCartOutlined style={{ fontSize: 16 }} />}
            >
              Giỏ hàng
            </Button>
          </a>
        </Link>
      )}
    </Dropdown>
  );
};

export default React.memo(Cart);
