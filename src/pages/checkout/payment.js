import { useState, useEffect, useMemo } from "react";
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
  Collapse,
  message,
  Result,
  Table,
} from "antd";

import { useCart } from "../../common/hooks";
import Layout from "../../components/Layout";
//-----------------------------------------------

const PAYMENT_COD = "cod";
const PAYMENT_BANK_TRANFER = "bank_tranfer";

export default function Payment() {
  const { items, address, clear } = useCart();

  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_COD);

  const totalItems = useMemo(() => {
    if (items.map((item) => item.quantity).length > 0) {
      return items.map((item) => item.quantity).reduce((a, b) => a + b);
    }
    return "";
  }, [items]);

  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    setOrdered(true);
    clear();
  };

  return (
    <Layout title="Thanh toán đặt hàng">
      {!ordered && (
        <Row gutter={[10, 10]}>
          <Col xs={24} md={16}>
            <Card title="Chọn hình thức thanh toán">
              <Radio.Group
                style={{ display: "flex", flexDirection: "column" }}
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
              >
                <Radio value={PAYMENT_COD} style={{ marginBottom: 15 }}>
                  Thanh toán tiền mặt khi nhận hàng (COD)
                </Radio>
                <Radio value={PAYMENT_BANK_TRANFER}>
                  Thanh toán chuyển khoản ngân hàng
                  {selectedPayment === PAYMENT_BANK_TRANFER && (
                    <Table
                      style={{ marginTop: 10 }}
                      bordered
                      size="small"
                      pagination={false}
                      columns={[
                        {
                          title: "Ngân hàng",
                          key: "bank_name",
                          dataIndex: "bank_name",
                        },
                        {
                          title: "Tên chủ tài khoản",
                          key: "bank_owner_name",
                          dataIndex: "bank_owner_name",
                        },
                        {
                          title: "Số tài khoản",
                          key: "bank_code",
                          dataIndex: "bank_code",
                        },
                      ]}
                      dataSource={[
                        {
                          bank_name: "Ngân hàng TMCP Công Thương Việt Nam",
                          bank_owner_name: "Tran Duc Kien",
                          bank_code: 12556298756678,
                        },
                      ]}
                      footer={() => (
                        <Card>
                          <p>
                            <b>*Nội dung chuyển khoản:</b>{" "}
                            {`< Tên người chuyển > < Mã sản phẩm >< Số điện thoại >< Số tiền >`}{" "}
                          </p>
                          <Divider />
                          <p style={{ whiteSpace: "normal" }}>
                            1. Ngay sau khi chuyển khoản thành công, Quý khách
                            vui lòng gọi đến hotline: <b>(+84) 982 722 922</b>{" "}
                            để gặp Tư vấn viên hỗ trợ.
                          </p>
                          <p style={{ whiteSpace: "normal" }}>
                            2. Thời gian VietinbankGold nhận được tiền chuyển
                            trong ngày (đối với cùng ngân hàng) và từ 1 đến 3
                            ngày (đối với chuyển khác ngân hàng)
                          </p>
                          <p style={{ whiteSpace: "normal" }}>
                            3. Phí chuyển tiền sẽ do khách hàng chịu phí. Quý
                            khách vui lòng kiểm tra với ngân hàng trước khi
                            chuyển.
                          </p>
                        </Card>
                      )}
                    />
                  )}
                </Radio>
              </Radio.Group>
              <Divider />
              <Button
                type="danger"
                size="large"
                style={{ width: 200 }}
                onClick={handleOrder}
              >
                ĐẶT MUA
              </Button>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              title="Địa chỉ giao hàng"
              extra={
                <Link href="/checkout/shipping">
                  <a>
                    <Button shape="round">Sửa</Button>
                  </a>
                </Link>
              }
            >
              <h3>{address?.fullname}</h3>
              <p style={{ marginBottom: 5 }}>
                {address?.address}, {address?.ward?.path_with_type}.
              </p>
              <p style={{ marginBottom: 0 }}>Điện thoại: {address?.phone}</p>
            </Card>
            <Divider />
            <Card
              title={`Đơn hàng (${totalItems} sản phẩm)`}
              extra={
                <Link href="/checkout/shipping">
                  <a>
                    <Button shape="round">Sửa</Button>
                  </a>
                </Link>
              }
            >
              <div></div>
            </Card>
          </Col>
        </Row>
      )}

      {ordered && (
        <Row justify="center">
          <Result
            status="success"
            title="Bạn đã đặt mua thành công"
            subTitle="VietinbankGold đang xử lý đơn hàng của bạn"
            extra={[
              <Link href="/">
                <a>
                  <Button>Quay về trang chủ</Button>
                </a>
              </Link>,
            ]}
          />
        </Row>
      )}
    </Layout>
  );
}
