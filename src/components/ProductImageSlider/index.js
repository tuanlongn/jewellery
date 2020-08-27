import React from "react";
import { Carousel } from "antd";
import InnerImageZoom from "react-inner-image-zoom";

import Image from "../Image";

import "./styles.less";
//-----------------------------------------------

const ProductImageSlider = ({ images, title }) => {
  return (
    <div className="product-image-slider">
      <InnerImageZoom
        src={images[0].replace("thumbnails/200/200", "thumbnails/435/435")}
        zoomSrc={images[0].replace("thumbnails/200/200", "")}
      />
      {/* <Carousel autoplay>
        {images.map((img, i) => (
          <div key={i} className="carousel-item">
            <Image src={img} alt={title || ""} />
          </div>
        ))}
      </Carousel> */}
    </div>
  );
};

export default React.memo(ProductImageSlider);
