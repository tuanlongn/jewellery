import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";

import "./styles.less";
//-----------------------------------------------

const Filter = ({ label, values, selected, onChange }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (selected && selected.length < selectedValues) {
      setSelectedValues(selected);
    }
  }, [selected]);

  const handleClickItem = ({ key, checked }) => {
    const index = selectedValues.indexOf(key);
    if (index !== -1) {
      selectedValues.splice(index, 1);
    } else {
      selectedValues.push(key);
    }
    setSelectedValues(selectedValues);

    if (onChange) {
      onChange(selectedValues);
    }
  };

  const list = (
    <Menu className="filter-menu" onMouseLeave={() => setVisible(false)}>
      {Object.keys(values).map((key) => (
        <Menu.Item key={key}>
          <Checkbox
            className="filter-item"
            checked={selectedValues.indexOf(key) !== -1}
            onChange={(e) =>
              handleClickItem({ key, checked: e.target.checked })
            }
          >
            {values[key]}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown.Button
      size="large"
      icon={<DownOutlined />}
      overlay={list}
      placement="bottomRight"
      visible={visible}
      onVisibleChange={() => setVisible(true)}
    >
      <div className="label">
        {label} {selectedValues.length > 0 ? `(${selectedValues.length})` : ""}
      </div>
    </Dropdown.Button>
  );
};

export default React.memo(Filter);
