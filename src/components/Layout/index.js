import React from "react";
import Head from "next/head";
import { Layout, BackTop } from "antd";
const { Content } = Layout;

import { useContainerSize } from "../../common/hooks";
import Header from "./Header";
import Footer from "./Footer";

import "./styles.less";
//-----------------------------------------------

const MainLayout = ({ title, cart, children }) => {
  const { width } = useContainerSize();

  return (
    <>
      <Head>
        <title>{title || "Trang sức, nhẫn vàng"}</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Layout>
        <Header width={width} cart={cart} />
        <Content className="page" style={{ width }}>
          {children}
        </Content>
        <Footer width={width} />
      </Layout>

      <BackTop />
    </>
  );
};

export default React.memo(MainLayout);
