import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Row,
  Col,
  Card,
  Descriptions,
  Breadcrumb,
  message,
  Divider,
} from "antd";

import { useProduct, useCart } from "../../common/hooks";
import Layout from "../../components/Layout";
import ProductImageSlider from "../../components/ProductImageSlider";
import ProductDetailInfo from "../../components/ProductDetailInfo";
//-----------------------------------------------

export default function Product({ data }) {
  const router = useRouter();
  const { slug } = router.query;
  const id = getProductId(slug || []);

  const { product, isLoading, isError } = useProduct(id);

  const cart = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleSelectedQuantity = (value) => {
    setSelectedQuantity(value);
  };

  const handleAddToCart = (item) => {
    cart.addItem(item, selectedQuantity);
    message.success(`Bạn vừa thêm sản phẩm vào giỏ hàng`);
  };

  const handleBuyNow = useCallback(() => {
    alert("buynow");
  }, [product]);

  return (
    <Layout
      title={`${data?.title || ""} | ${data?.category || ""}`}
      cart={cart}
    >
      <Card className="product-detail" style={{ backgroundColor: "white" }}>
        <Row>
          <Breadcrumb>
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">{data?.category}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{data?.title}</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <Col xs={24} md={12}>
            <ProductImageSlider
              images={data?.image ? [data.image, data.image, data.image] : []}
            />
          </Col>
          <Col xs={24} md={12}>
            <ProductDetailInfo
              {...data}
              {...product}
              onSelectedQuantity={handleSelectedQuantity}
              addToCart={() => handleAddToCart({ ...data, ...product })}
              buyNow={handleBuyNow}
            />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Descriptions
            title="Thuộc tính sản phẩm"
            bordered
            size="small"
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="Tuổi vàng">10K</Descriptions.Item>
            <Descriptions.Item label="Loại đá">Ruby</Descriptions.Item>
            <Descriptions.Item label="Màu sắc">Vàng</Descriptions.Item>
            <Descriptions.Item label="Nhãn hiệu">PNJ</Descriptions.Item>
            <Descriptions.Item label="Xuất xứ">Việt Nam</Descriptions.Item>
            <Descriptions.Item label="Ngày xuất xưởng">
              08/2020
            </Descriptions.Item>
          </Descriptions>
        </Row>
      </Card>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${process.env.HOST}/api/getAllProductIds`);
//   const json = await res.json();

//   const paths = json.data.map((id) => ({
//     params: {
//       slug: ["_category", `_product.p${id}`],
//     },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params }) {
//   const { slug } = params;
//   const id = getProductId(slug);
//   const res = await fetch(`${process.env.HOST}/api/product/${id}`);
//   const json = await res.json();

//   return { props: { data: json.data } };
// }

const getProductId = (slug) => {
  if (!slug || slug.length === 0) {
    return null;
  }
  const p = slug[slug.length - 1].split(".");
  const id = p.length > 0 ? p[p.length - 1].replace("p", "") : null;
  return id;
};
