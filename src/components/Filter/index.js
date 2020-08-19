import React, { useState } from "react";
import { Dropdown, Menu, Divider, Tag } from "antd";
import {
  DownOutlined,
  CheckSquareFilled,
  CheckSquareOutlined,
} from "@ant-design/icons";

import "./styles.less";
//-----------------------------------------------

const Filter = ({ label, values, onChange }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleClickItem = ({ key }) => {
    const index = selectedValues.indexOf(key);
    if (index !== -1) {
      selectedValues.splice(index, 1);
    } else {
      selectedValues.push(key);
    }
    setSelectedValues(selectedValues);
    onChange(selectedValues);
  };

  const list = (
    <Menu
      className="filter-menu"
      multiple
      selectedKeys={selectedValues}
      onClick={handleClickItem}
    >
      {Object.keys(values).map((key) => (
        <Menu.Item
          key={key}
          icon={
            selectedValues.indexOf(key) !== -1 ? (
              <CheckSquareFilled />
            ) : (
              <CheckSquareOutlined />
            )
          }
        >
          {values[key]}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown.Button
      icon={<DownOutlined />}
      overlay={list}
      placement="bottomRight"
    >
      <div className="label">{label}</div>
    </Dropdown.Button>
  );
};

export default React.memo(Filter);
