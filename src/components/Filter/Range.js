import React, { useState, useMemo } from "react";
import NumberFormat from "react-number-format";
import { Dropdown, Card, Slider, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";

import "./styles.less";
//-----------------------------------------------

const FilterRange = ({ label, onChange }) => {
  const [range, setRange] = useState([2000000, 100000000]);
  const [visible, setVisible] = useState(false);

  const handleChange = (value) => {
    setRange(value);
  };

  const handleAfterChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  const list = (
    <Card className="range-box" onMouseLeave={() => setVisible(false)}>
      <Slider
        className="slider"
        range
        defaultValue={range}
        min={0}
        max={50000000}
        step={1000}
        onChange={handleChange}
        onAfterChange={handleAfterChange}
        tipFormatter={(value) => (
          <NumberFormat
            value={value}
            displayType={"text"}
            thousandSeparator="."
            decimalSeparator=","
            suffix=" ₫"
          />
        )}
      />
      <div className="range-input-wrap">
        <Input.Group compact>
          <Input
            addonBefore="Từ"
            addonAfter="đ"
            value={range[0]}
            className="
          range-input"
          />
          <Input
            addonBefore="Đến"
            addonAfter="đ"
            value={range[1]}
            className="
          range-input"
          />
        </Input.Group>
      </div>
    </Card>
  );

  return (
    <Dropdown.Button
      icon={<DownOutlined />}
      overlay={list}
      placement="bottomRight"
      visible={visible}
      onVisibleChange={() => setVisible(true)}
    >
      <div className="label">{label}</div>
    </Dropdown.Button>
  );
};

export default React.memo(FilterRange);
