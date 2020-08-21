import React from "react";

import "./styles.less";
//-----------------------------------------------

const Footer = ({ width }) => {
  return (
    <div className="footer">
      <div className="container" style={{ width }}>
        <ul>
          <li>
            <div className="">
              <h5>Dịch vụ khách hàng</h5>
              <p>Hướng dẫn mua hàng</p>
              <p>Hướng dẫn thanh toán</p>
              <p>Mua hàng trả góp</p>
              <p>Phương thức vận chuyển</p>
              <p>Hướng dẫn sử dụng/ bảo quản trang sức</p>
              <p>Chương trình khách hàng thân thiết</p>
            </div>
          </li>
          <li>
            <div className="">
              <h5>Cẩm nang mua sắm</h5>
              <p>Trang sức theo ngày sinh</p>
              <p>Trang sức theo phong thuỷ</p>
              <p>Trang sức Kim Cương</p>
              <p>Trang sức Ngọc Trai</p>
              <p>Trang sức Đá Quý</p>
              <p>Trang sức Đồng Hồ</p>
            </div>
          </li>
          <li>
            <div className="">
              <h5>Về chúng tôi</h5>
              <p>Về VietinbankGold</p>
              <p>Thông tin liên hệ</p>
              <p>Sản phẩm</p>
              <p>Dịch vụ</p>
            </div>
          </li>
        </ul>

        <div className="social-network"></div>
      </div>
      <div className="copyright">
        Bản quyền thuộc về công ty TNHH MTV Vàng bạc Đá quý Ngân Hàng TMCP Công
        Thương Việt Nam.
      </div>
    </div>
  );
};

export default Footer;
