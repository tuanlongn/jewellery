import { useMemo } from "react";
import Link from "next/link";
import { Breadcrumb, Row, Col, Card, Divider } from "antd";

import { useCart } from "../common/hooks";
import Layout from "../components/Layout";
import CartItem from "../components/Cart/Item";
//-----------------------------------------------

export default function Order() {
  const cart = useCart();

  return (
    <Layout title="Đặt hàng">
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">
              <a>Trang chủ</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Đặt hàng</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
    </Layout>
  );
}
