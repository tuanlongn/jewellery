import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Breadcrumb,
  Row,
  Col,
  Card,
  Divider,
  Button,
  Radio,
  Space,
  message,
} from "antd";

import { useCart, useAddress, useRegion } from "../../common/hooks";
import Layout from "../../components/Layout";
import DeliveryAddressForm from "../../components/DeliveryAddress/Form";
import DeliveryAddressItem from "../../components/DeliveryAddress/Item";
import CartSummary from "../../components/Cart/Summary";
//-----------------------------------------------

export default function Shipping() {
  const router = useRouter();
  const cart = useCart();
  const region = useRegion();
  const { addresses, addAddress, updateAddress, removeAddress } = useAddress();
  const [newAddress, setNewAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (addresses.length === 0) {
      setNewAddress(true);
    }
  }, [addresses]);

  const handleAddressFormSubmit = (value) => {
    addAddress(value);
    setNewAddress(false);
  };

  const handleChooseAddress = (e) => {
    setSelectedAddress(e.target.value);
  };

  const handleNextCheckout = () => {
    if (selectedAddress === null) {
      message.error("Bạn chưa chọn địa chỉ giao hàng");
    } else {
      cart.selectAddress(addresses[selectedAddress]);
      router.push("/checkout/payment");
    }
  };

  return (
    <Layout title="Đặt hàng">
      <Row style={{ marginBottom: 15 }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">
              <a>Trang chủ</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Đặt hàng</Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      <Row gutter={[10, 10]}>
        <Col xs={24} md={16}>
          <Card>
            <Radio.Group
              defaultValue={selectedAddress}
              onChange={(val) => handleChooseAddress(val)}
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {!newAddress &&
                addresses.map((adr, i) => (
                  <Radio
                    key={i}
                    value={i}
                    style={{ display: "flex", marginBottom: 10 }}
                  >
                    <DeliveryAddressItem {...adr} />
                  </Radio>
                ))}
            </Radio.Group>

            {!newAddress && addresses.length > 0 && (
              <Row>
                <Col span={24}>
                  Bạn muốn giao hàng đến địa chỉ khác?{" "}
                  <a onClick={() => setNewAddress(true)}>
                    Thêm địa chỉ giao hàng mới.
                  </a>
                </Col>
              </Row>
            )}

            {newAddress && (
              <>
                <Divider />

                <DeliveryAddressForm
                  type="add"
                  region={region}
                  onSubmitData={handleAddressFormSubmit}
                  onCancel={() => setNewAddress(false)}
                />
              </>
            )}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <CartSummary items={cart.items} />
            <Button
              size="large"
              block
              onClick={() => router.push("/checkout/cart")}
            >
              Giỏ hàng
            </Button>
            <Divider />
            <Button
              type="danger"
              size="large"
              block
              onClick={handleNextCheckout}
            >
              ĐẶT HÀNG
            </Button>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
