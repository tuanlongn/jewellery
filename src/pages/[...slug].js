import { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Row, Col, Button } from "antd";

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

  const handleAddToCart = useCallback(() => {
    alert("add to cart");
  }, [product]);

  const handleBuyNow = useCallback(() => {
    alert("buynow");
  }, [product]);

  return (
    <Layout title={`${data?.title || ""} | ${data?.category || ""}`}>
      <div className="product-detail">
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
              addToCart={handleAddToCart}
              buyNow={handleBuyNow}
            />
          </Col>
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
