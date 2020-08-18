import Head from "next/head";
import { Layout, Menu, Dropdown, Button, message, Tooltip } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;

export default function Home() {
  const menu = (
    <Menu onClick={() => alert(1)}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Head>
        <title>Trang sức, nhẫn vàng</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider>
            <Dropdown overlay={menu}>
              <Button>
                Button <DownOutlined />
              </Button>
            </Dropdown>
          </Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
}
