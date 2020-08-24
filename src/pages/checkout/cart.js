import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Breadcrumb, Row, Col, Card, Divider, Button } from "antd";

import { useCart } from "../../common/hooks";
import Layout from "../../components/Layout";
import CartItem from "../../components/Cart/Item";
import CartSummary from "../../components/Cart/Summary";
//-----------------------------------------------

export default function Cart() {
  const router = useRouter();
  const cart = useCart();

  return (
    <Layout title="Thông tin giỏ hàng">
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
            {cart.items.length > 0 ? (
              cart.items.map((p, i) => (
                <>
                  <CartItem
                    key={p.id}
                    {...p}
                    onChangeQuantity={cart.updateItem}
                    onRemoveItem={cart.removeItem}
                  />
                  {i + 1 < cart.items.length && <Divider />}
                </>
              ))
            ) : (
              <div>
                Bạn chưa có sản phẩm nào vào giỏ hàng.{" "}
                <Link href="/">
                  <a>Hãy quay lại trang sản phẩm.</a>
                </Link>
              </div>
            )}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <CartSummary items={cart.items} />
            <Button
              type="danger"
              size="large"
              block
              disabled={cart.items.length === 0}
              onClick={() => router.push("/checkout/shipping")}
            >
              Tiến hành đặt hàng
            </Button>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
