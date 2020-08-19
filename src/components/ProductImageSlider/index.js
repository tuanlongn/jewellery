import React from "react";
import { Carousel } from "antd";

import "./styles.less";
//-----------------------------------------------

const ProductImageSlide = ({ images, title }) => {
  return (
    <Carousel autoplay>
      {images.map((img, i) => (
        <div key={i} className="carousel-item">
          <img src={img} alt={title || ""} />
        </div>
      ))}
    </Carousel>
  );
};

export default React.memo(ProductImageSlide);
