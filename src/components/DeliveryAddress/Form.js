import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { Form, Select, Input, Divider, Button, Space } from "antd";
import { removeAccents } from "../../common/utils";

//-----------------------------------------------

const DeliveryAddressForm = ({
  region,
  values,
  type,
  onSubmitData,
  onCancel,
}) => {
  const schema = yup.object().shape({
    fullname: yup.string().required("Bạn cần nhập đầy đủ họ tên"),
    phone: yup.string().required("Bạn cần nhập số điện thoại liên hệ"),
    province: yup.mixed().required("Bạn cần nhập tỉnh/thành phố"),
    district: yup.mixed().when("province", {
      is: true,
      then: yup.mixed().required("Bạn cần nhập quận/huyện"),
    }),
    ward: yup.mixed().when("district", {
      is: true,
      then: yup.mixed().required("Bạn cần nhập phường/xã"),
      otherwise: yup.mixed().required("Bạn cần nhập phường/xã"),
    }),
    address: yup.string().required("Bạn cần nhập địa chỉ chi tiết"),
  });

  const { register, watch, setValue, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  console.log("errors", errors);

  const onSubmit = (data, e) => {
    onSubmitData(data);
  };

  return (
    <Form
      layout="horizontal"
      onFinish={handleSubmit(onSubmit)}
      size="large"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 10 }}
    >
      <Form.Item
        label="Họ tên"
        validateStatus={errors.fullname && "error"}
        help={errors.fullname && errors.fullname.message}
      >
        <Input onChange={(e) => setValue("fullname", e.target.value)} />
      </Form.Item>
      <Form.Item
        label="Điện thoại di động"
        validateStatus={errors.phone && "error"}
        help={errors.phone && errors.phone.message}
      >
        <Input onChange={(e) => setValue("phone", e.target.value)} />
      </Form.Item>
      <Form.Item
        label="Tỉnh/Thành phố"
        validateStatus={errors.province && "error"}
        help={errors.province && errors.province.message}
      >
        <Select
          showSearch
          allowClear
          placeholder="Chọn tỉnh, thành phố"
          options={region.provinces.map((item) => ({
            name: item.name,
            label: item.name_with_type,
            value: item.code,
          }))}
          filterOption={(input, option) =>
            removeAccents(option.name)
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
          value={watch("province")?.value}
          onChange={(value) => {
            setValue(
              "province",
              region.provinces.find((item) => item.code === value)
            );
            setValue("district", null);
            region.setSelectedProvince(value);
          }}
          loading={region.isLoadingProvinceData}
        />
      </Form.Item>
      <Form.Item
        label="Quận/Huyện"
        validateStatus={errors.district && "error"}
        help={errors.district && errors.district.message}
      >
        <Select
          showSearch
          allowClear
          placeholder="Chọn quận, huyện"
          disabled={region.districts.length === 0}
          options={region.districts.map((item) => ({
            name: item.name,
            label: item.name_with_type,
            value: item.code,
          }))}
          filterOption={(input, option) =>
            removeAccents(option.name)
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
          value={watch("district")?.value}
          onChange={(value) => {
            setValue(
              "district",
              region.districts.find((item) => item.code === value)
            );
            setValue("ward", null);
            region.setSelectedDistrict(value);
          }}
          loading={region.isLoadingDistrictData}
        />
      </Form.Item>
      <Form.Item
        label="Phường/Xã"
        validateStatus={errors.ward && "error"}
        help={errors.ward && errors.ward.message}
      >
        <Select
          showSearch
          allowClear
          placeholder="Chọn phường, xã"
          disabled={region.wards.length === 0}
          options={region.wards.map((item) => ({
            name: item.name,
            label: item.name_with_type,
            value: item.code,
          }))}
          filterOption={(input, option) =>
            removeAccents(option.name)
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
          value={watch("ward")?.value}
          onChange={(value) => {
            setValue(
              "ward",
              region.wards.find((item) => item.code === value)
            );
          }}
          loading={region.isLoadingWardData}
        />
      </Form.Item>
      <Form.Item
        label="Địa chỉ"
        validateStatus={errors.address && "error"}
        help={errors.address && errors.address.message}
      >
        <Input onChange={(e) => setValue("address", e.target.value)} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space>
          <Button htmlType="button" onClick={onCancel}>
            Huỷ
          </Button>
          <Button type="primary" htmlType="submit">
            {type === "update" ? "Cập nhật " : "Giao đến địa chỉ này"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default DeliveryAddressForm;
