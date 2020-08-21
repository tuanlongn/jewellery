import { useMemo } from "react";
import Link from "next/link";
import { Breadcrumb, Row, Col, Card, Divider, Button, Space } from "antd";

import { useCart } from "../common/hooks";
import Layout from "../components/Layout";
import CartItem from "../components/Cart/Item";
import CartSummary from "../components/Cart/Summary";
//-----------------------------------------------

export default function Cart() {
  const cart = useCart();

  return (
    <Layout title="Thông tin giỏ hàng" cart={cart}>
      <Row style={{ marginBottom: 10 }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">
              <a>Trang chủ</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Giỏ hàng</Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      <Row gutter={[10, 10]}>
        <Col xs={24} md={16}>
          <Card>
            {cart.items.map((p, i) => (
              <>
                <CartItem key={p.id} {...p} />
                {i + 1 < cart.items.length && <Divider />}
              </>
            ))}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <CartSummary items={cart.items} />
            <Button type="danger" size="large" block>
              Tiến hành đặt hàng
            </Button>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
