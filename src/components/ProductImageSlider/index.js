import React from "react";
import { Carousel } from "antd";

import Image from "../Image";

import "./styles.less";
//-----------------------------------------------

const ProductImageSlide = ({ images, title }) => {
  return (
    <div className="product-image-slider">
      <Carousel autoplay>
        {images.map((img, i) => (
          <div key={i} className="carousel-item">
            <Image src={img} alt={title || ""} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default React.memo(ProductImageSlide);
