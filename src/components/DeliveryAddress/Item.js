import React from "react";
import { Card } from "antd";

import "./styles.less";
//-----------------------------------------------

const DeliveryAddressItem = ({
  fullname,
  phone,
  address,
  province,
  district,
  ward,
}) => {
  return (
    <Card className="delivery-address-item" bodyStyle={{ padding: 10 }}>
      <div className="fullname">{fullname}</div>
      <div className="phone">{phone}</div>
      <div className="address">
        {address}, {ward?.path}
      </div>
    </Card>
  );
};

export default React.memo(DeliveryAddressItem);
