import { useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Row,
  Col,
  PageHeader,
  Menu,
  Dropdown,
  Button,
  message,
  Tooltip,
  Space,
  Empty,
  Pagination,
  Divider,
  Tag,
} from "antd";

import { useFilterProducts } from "../common/hooks";
import { slugify } from "../common/utils";
import Filter from "../components/Filter";
import FilterRange from "../components/Filter/Range";
import ProductListSkeleton from "../components/ProductListSkeleton";
import ProductItem from "../components/ProductItem";
import Layout from "../components/Layout";
import EmptyResult from "../components/EmptyResult";
//-----------------------------------------------

export default function Home({ data }) {
  const {
    products: filterProducts,
    isLoading,
    filters,
    setFilters,
  } = useFilterProducts();

  const products = useMemo(() => {
    if (filterProducts) {
      return filterProducts;
    }
    return data;
  }, [filterProducts]);

  return (
    <Layout title="Vàng bạc, trang sức & đá quý">
      <Row>
        <Space>
          <Filter
            label="Tuổi vàng"
            values={{
              "10k": "Vàng 10K",
              "14k": "Vàng 14K",
              "18k": "Vàng 18K",
              "22k": "Vàng 22K",
              "24k": "Vàng 24K",
            }}
            onChange={(values) => setFilters({ ...filters, age: values })}
          />
          <Filter
            label="Loại đá"
            values={{
              Ruby: "Đá Ruby",
              Sapphire: "Đá Sapphire",
              Topaz: "Đá Topaz",
            }}
            onChange={(values) => setFilters({ ...filters, type: values })}
          />
          <Filter
            label="Màu sắc"
            values={{
              Trắng: "Màu trắng",
              Hồng: "Màu hồng",
              Vàng: "Màu vàng",
              Đỏ: "Màu đỏ",
            }}
            onChange={(values) => setFilters({ ...filters, color: values })}
          />

          <FilterRange
            label="Khoảng giá"
            onChange={(value) => setFilters({ ...filters, price: value })}
          />
        </Space>
      </Row>
      <br />
      <Row>
        {Object.keys(filters).length > 0 && (
          <>
            <span>Lọc dữ liệu:</span>
            {Object.keys(filters).map((attr) => {
              if (["age", "type", "color"].indexOf(attr) !== -1) {
                return filters[attr].map((v) => <Tag key={v}>{v}</Tag>);
              }
            })}
          </>
        )}
      </Row>

      <Divider />

      <div className="product-list">
        {isLoading ? (
          <ProductListSkeleton />
        ) : (
          <>
            {products.length > 0 ? (
              <>
                <Row gutter={[10, 10]}>
                  {products.map((p) => (
                    <Col xs={12} sm={8} md={6} key={p.id}>
                      <Link
                        href="/[...slug]"
                        as={`${slugify(p.category)}/${slugify(p.title)}.p${
                          p.id
                        }`}
                      >
                        <a>
                          <ProductItem {...p} />
                        </a>
                      </Link>
                    </Col>
                  ))}
                </Row>
                <Row>
                  <Col span={24}>
                    <div
                      className="pagination"
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 20,
                      }}
                    >
                      <Pagination defaultCurrent={1} total={50} />
                    </div>
                  </Col>
                </Row>
              </>
            ) : (
              <EmptyResult />
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.HOST}/api/products`);
  const json = await res.json();

  return { props: { data: json.data, pagination: json.pagination } };
}
