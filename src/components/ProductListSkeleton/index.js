import React from "react";
import ReactResizeDetector from "react-resize-detector";
import { Skeleton, Card, Row, Col } from "antd";

import "./styles.less";
//-----------------------------------------------

const ProductListSkeleton = ({}) => {
  return (
    <Row gutter={[4, 4]}>
      {Array.from(Array(12), (_, i) => i + 1).map((i) => (
        <Col key={i} xs={12} sm={8} md={6}>
          <ReactResizeDetector handleWidth>
            {({ width }) => (
              <Card
                style={{ height: width }}
                bodyStyle={{ height: "100%", padding: 10 }}
              >
                <Skeleton.Image className="skeleton-image" />
                <br />
                <br />
                <Skeleton paragraph={{ rows: 0 }} round active />
              </Card>
            )}
          </ReactResizeDetector>
        </Col>
      ))}
    </Row>
  );
};

export default React.memo(ProductListSkeleton);
