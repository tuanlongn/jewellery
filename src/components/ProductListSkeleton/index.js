import React from "react";
import ReactResizeDetector from "react-resize-detector";
import { Skeleton, Card, Row, Col, Space } from "antd";

import "./styles.less";
//-----------------------------------------------

const ProductListSkeleton = ({}) => {
  return (
    <>
      <Row gutter={[4, 4]}>
        {Array.from(Array(12), (_, i) => i + 1).map((i) => (
          <Col key={i} xs={12} sm={8} md={6}>
            <ReactResizeDetector handleWidth>
              {({ width }) => (
                <Card
                  style={{ height: width }}
                  bodyStyle={{
                    height: "100%",
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="product-list-skeleton-image">
                    <Skeleton.Image />
                  </div>
                  <div className="product-list-skeleton-line">
                    <Skeleton.Button
                      size="small"
                      shape="round"
                      style={{ width: 200, height: 10 }}
                      active
                    />
                    <Skeleton.Button
                      size="small"
                      shape="round"
                      style={{ width: 100, height: 10 }}
                      active
                    />
                  </div>
                </Card>
              )}
            </ReactResizeDetector>
          </Col>
        ))}
      </Row>
      <Row justify="center">
        <Card
          style={{ borderRadius: 5, marginTop: 20 }}
          bodyStyle={{
            paddingTop: 6,
            paddingBottom: 6,
            paddingRight: 10,
            paddingLeft: 10,
          }}
        >
          <Space>
            <Skeleton.Button size="small" shape="circle" active />
            <Skeleton.Button size="small" shape="circle" active />
            <Skeleton.Button size="small" shape="circle" active />
            <Skeleton.Button size="small" shape="circle" active />
            <Skeleton.Button size="small" shape="circle" active />
          </Space>
        </Card>
      </Row>
    </>
  );
};

export default React.memo(ProductListSkeleton);
