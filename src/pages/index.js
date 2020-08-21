import { useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import NumberFormat from "react-number-format";
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
import { signIn, signOut, useSession } from "next-auth/client";

import { useFilterProducts, useLocalStorage } from "../common/hooks";
import { slugify } from "../common/utils";
import Filter from "../components/Filter";
import FilterRange from "../components/Filter/Range";
import ProductListSkeleton from "../components/ProductListSkeleton";
import ProductItem from "../components/ProductItem";
import Layout from "../components/Layout";
import EmptyResult from "../components/EmptyResult";
//-----------------------------------------------

const AGE_VALUES = {
  "10k": "Vàng 10K",
  "14k": "Vàng 14K",
  "18k": "Vàng 18K",
  "22k": "Vàng 22K",
  "24k": "Vàng 24K",
};

const TYPE_VALUES = {
  Ruby: "Đá Ruby",
  Sapphire: "Đá Sapphire",
  Topaz: "Đá Topaz",
};

const COLOR_VALUES = {
  Trắng: "Màu trắng",
  Hồng: "Màu hồng",
  Vàng: "Màu vàng",
  Đỏ: "Màu đỏ",
};

export default function Home({ data }) {
  const [session, loading] = useSession();
  console.log("session", session);
  const [cart] = useLocalStorage("cart");

  const {
    products: filterProducts,
    pagination,
    isLoading,
    filters,
    setFilters,
    setPage,
  } = useFilterProducts();
  console.log("filters", filters);

  const products = useMemo(() => {
    if (filterProducts) {
      return filterProducts;
    }
    return data;
  }, [filterProducts]);

  const handleRemoveFilterValue = (attr, value) => {
    const values = filters[attr];
    values.splice(values.indexOf(value), 1);
    setFilters({ ...filters, [attr]: values });
  };

  return (
    <Layout title="Vàng bạc, trang sức & đá quý" cart={cart}>
      {/* {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )} */}

      <Row>
        <Space>
          <Filter
            label="Tuổi vàng"
            values={AGE_VALUES}
            selected={filters.age}
            onChange={(values) => setFilters({ ...filters, age: values })}
          />
          <Filter
            label="Loại đá"
            values={TYPE_VALUES}
            selected={filters.type}
            onChange={(values) => setFilters({ ...filters, type: values })}
          />
          <Filter
            label="Màu sắc"
            values={COLOR_VALUES}
            selected={filters.color}
            onChange={(values) => setFilters({ ...filters, color: values })}
          />

          <FilterRange
            label="Khoảng giá"
            onChange={(value) => setFilters({ ...filters, price: value })}
          />
        </Space>
      </Row>

      <Row style={{ marginTop: 15, marginBottom: 15 }}>
        {Object.keys(filters).map((attr) => filters[attr].length).length > 0 &&
          Object.keys(filters)
            .map((attr) => filters[attr].length)
            .reduce((a, b) => a + b) > 0 && (
            <>
              <span style={{ marginRight: 10 }}>Lọc dữ liệu:</span>
              {Object.keys(filters).map((attr) => {
                if (["age", "type", "color"].indexOf(attr) !== -1) {
                  return filters[attr].map((v) => (
                    <Tag
                      key={v}
                      closable
                      onClose={() => handleRemoveFilterValue(attr, v)}
                    >
                      {attr === "age" && AGE_VALUES[v]}
                      {attr === "type" && TYPE_VALUES[v]}
                      {attr === "color" && COLOR_VALUES[v]}
                    </Tag>
                  ));
                }

                if (attr === "price") {
                  let components = [];
                  if (filters.price[0]) {
                    components.push(
                      <Tag
                        key={`${attr}-from`}
                        closable
                        onClose={() =>
                          handleRemoveFilterValue(attr, filters.price[0])
                        }
                      >
                        Giá từ:{" "}
                        {
                          <NumberFormat
                            value={filters.price[0]}
                            displayType={"text"}
                            thousandSeparator="."
                            decimalSeparator=","
                            suffix=" ₫"
                          />
                        }
                      </Tag>
                    );
                  }
                  if (filters.price[1]) {
                    components.push(
                      <Tag
                        key={`${attr}-to`}
                        closable
                        onClose={() =>
                          handleRemoveFilterValue(attr, filters.price[1])
                        }
                      >
                        Giá đến:{" "}
                        {
                          <NumberFormat
                            value={filters.price[1]}
                            displayType={"text"}
                            thousandSeparator="."
                            decimalSeparator=","
                            suffix=" ₫"
                          />
                        }
                      </Tag>
                    );
                  }
                  return components;
                }
              })}
            </>
          )}
      </Row>

      <div className="product-list">
        {isLoading ? (
          <ProductListSkeleton />
        ) : (
          <>
            {products.length > 0 ? (
              <>
                <Row gutter={[4, 4]}>
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
                      <Pagination
                        defaultCurrent={pagination?.currentPage || 1}
                        total={pagination?.total}
                        pageSize={24}
                        responsive={true}
                        showSizeChanger={false}
                        onChange={(page) => setPage(page)}
                      />
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
