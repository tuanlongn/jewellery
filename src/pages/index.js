import { useMemo } from "react";
import Link from "next/link";
import { Row, Col, Space, Pagination, Tag, Input } from "antd";
import { signIn, signOut, useSession } from "next-auth/client";

import { AGE_VALUES, TYPE_VALUES, COLOR_VALUES } from "../common/constants";
import { useFilterProducts, useCart } from "../common/hooks";
import { slugify } from "../common/utils";
import Filter from "../components/Filter";
import FilterRange from "../components/Filter/Range";
import ProductListSkeleton from "../components/ProductListSkeleton";
import ProductItem from "../components/ProductItem";
import Layout from "../components/Layout";
import EmptyResult from "../components/EmptyResult";
import Money from "../components/Money";
//-----------------------------------------------

export default function Home({ data }) {
  const [session, loading] = useSession();
  const cart = useCart();

  const {
    products: filterProducts,
    pagination,
    isLoading,
    filters,
    setFilters,
    removeFilterValue,
    setPage,
  } = useFilterProducts();

  const products = useMemo(() => {
    if (filterProducts) {
      return filterProducts;
    }
    return data;
  }, [filterProducts]);

  const handleCartUpdate = (pid, quantity) => {
    cart.updateItem(pid, quantity);
  };

  return (
    <Layout
      title="Vàng bạc, trang sức & đá quý"
      cart={cart}
      onCartUpdate={handleCartUpdate}
    >
      {/* {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )} */}

      <Row style={{ marginBottom: 15 }}>
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

          <Input.Search
            size="large"
            allowClear
            // value={filters.keyword}
            onSearch={(value) => setFilters({ ...filters, keyword: value })}
          />
        </Space>
      </Row>

      {Object.keys(filters).map((attr) => filters[attr].length).length > 0 &&
        Object.keys(filters)
          .map((attr) => filters[attr].length)
          .reduce((a, b) => a + b) > 0 && (
          <Row style={{ marginBottom: 15 }}>
            <span style={{ marginRight: 10 }}>Lọc dữ liệu:</span>
            {Object.keys(filters).map((attr) => {
              if (["age", "type", "color"].indexOf(attr) !== -1) {
                return filters[attr].map((v) => (
                  <Tag
                    key={v}
                    closable
                    onClose={() => removeFilterValue(attr, v)}
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
                      onClose={() => removeFilterValue(attr, filters.price[0])}
                    >
                      Giá từ: {<Money value={filters.price[0]} />}
                    </Tag>
                  );
                }
                if (filters.price[1]) {
                  components.push(
                    <Tag
                      key={`${attr}-to`}
                      closable
                      onClose={() => removeFilterValue(attr, filters.price[1])}
                    >
                      Giá đến: {<Money value={filters.price[1]} />}
                    </Tag>
                  );
                }
                return components;
              }

              if (attr === "keyword") {
                return (
                  <Tag
                    key={filters[attr]}
                    closable
                    onClose={() => removeFilterValue(attr, filters[attr])}
                  >
                    Từ khoá: {filters[attr]}
                  </Tag>
                );
              }
            })}
          </Row>
        )}

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
                        href="/product/[...slug]"
                        as={`/product/${slugify(p.category)}/${slugify(
                          p.title
                        )}.p${p.id}`}
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
