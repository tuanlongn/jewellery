import React from "react";
import Head from "next/head";
import { Layout } from "antd";
const { Content } = Layout;

import { useContainerSize } from "../../common/hooks";
import Header from "./Header";
import Footer from "./Footer";

import "./styles.less";
//-----------------------------------------------

const MainLayout = ({ title, children }) => {
  const { width } = useContainerSize();

  return (
    <>
      <Head>
        <title>{title || "Trang sức, nhẫn vàng"}</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Layout>
        <Header width={width} />
        <Content className="page" style={{ width }}>
          {children}
        </Content>
        <Footer width={width} />
      </Layout>
    </>
  );
};

export default React.memo(MainLayout);
