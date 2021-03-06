import React from "react";
import { Img } from "react-image";
import VisibilitySensor from "react-visibility-sensor";
import { Skeleton } from "antd";

import "./styles.less";
//-----------------------------------------------

const Image = ({ src, alt }) => {
  return (
    <VisibilitySensor>
      <Img
        className="m-image"
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        loader={
          <div className="skeleton-image">
            <Skeleton.Image />
          </div>
        }
        unloader={
          <div className="skeleton-image">
            <Skeleton.Image />
          </div>
        }
      />
    </VisibilitySensor>
  );
};

export default React.memo(Image);
