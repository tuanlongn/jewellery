import { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Row, Col, Descriptions, Breadcrumb } from "antd";

import Layout from "../components/Layout";
import ProductImageSlider from "../components/ProductImageSlider";
import ProductDetailInfo from "../components/ProductDetailInfo";
import { useProduct } from "../common/hooks";
//-----------------------------------------------

export default function Product({ data }) {
  const router = useRouter();
  const { slug } = router.query;
  const id = getProductId(slug || []);

  const { product, isLoading, isError } = useProduct(id);

  const handleAddToCart = (item) => {
    console.log("item", item);
  };

  const handleBuyNow = useCallback(() => {
    alert("buynow");
  }, [product]);

  return (
    <Layout title={`${data?.title || ""} | ${data?.category || ""}`}>
      <div className="product-detail" style={{ backgroundColor: "white" }}>
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
          <Col span={12}>
            <ProductImageSlider
              images={data?.image ? [data.image, data.image, data.image] : []}
            />
          </Col>
          <Col span={12}>
            <ProductDetailInfo
              {...data}
              {...product}
              addToCart={() => handleAddToCart({ ...data, ...product })}
              buyNow={handleBuyNow}
            />
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            This beautiful bangle by Swarovski exhibits timeless, understated
            elegance in a modern interpretation of the spiral trend. A brilliant
            line of sparkling white stones follows the gently curving lines of
            the bangle, adding glittering radiance to the design. On-trend and
            refined, this bangle complements your everyday looks with a
            brilliant touch.
          </Col>
          <Descriptions
            title="Responsive Descriptions"
            bordered
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="Product">
              Cloud Database
            </Descriptions.Item>
            <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
            <Descriptions.Item label="time">18:00:00</Descriptions.Item>
            <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
            <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
            <Descriptions.Item label="Official">$60.00</Descriptions.Item>
          </Descriptions>
        </Row>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.HOST}/api/getAllProductIds`);
  const json = await res.json();

  const paths = json.data.map((id) => ({
    params: {
      slug: ["_category", `_product.p${id}`],
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const id = getProductId(slug);
  const res = await fetch(`${process.env.HOST}/api/product/${id}`);
  const json = await res.json();

  return { props: { data: json.data } };
}

const getProductId = (slug) => {
  if (!slug || slug.length === 0) {
    return null;
  }
  const p = slug[slug.length - 1].split(".");
  const id = p.length > 0 ? p[p.length - 1].replace("p", "") : null;
  return id;
};
