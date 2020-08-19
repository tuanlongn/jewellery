import React, { useMemo } from "react";
import { Empty } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

import "./styles.less";

//-----------------------------------------------

const EmptyResult = ({ description }) => {
  const screens = useBreakpoint();

  const height = useMemo(() => {
    if (screens.md) {
      return 500;
    }
    return 100;
  }, [screens]);

  return (
    <div className="empty-result" style={{ height }}>
      <Empty description={description || "Không có dữ liệu"} />
    </div>
  );
};

export default React.memo(EmptyResult);
