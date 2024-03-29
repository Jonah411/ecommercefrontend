import React, { useEffect, useState } from "react";
import "../../../src/App.css";
import { BASE_URL } from "../../constants/ConstaltsVariables";
import WishListIcon from "../common/WishListIcon";

const ImageGalleryDetails = ({ images, wishListData, productId }) => {
  const [sliderData, setSliderData] = useState(images && images[0]);
  useEffect(() => {
    setSliderData(images && images[0]);
  }, [images]);
  const hendleClick = (index) => {
    const slider = images[index];
    setSliderData(slider);
  };
  return (
    <div className="image-app p-2">
      <WishListIcon
        image={sliderData}
        wishListData={wishListData}
        productId={productId}
      />
      <div className="flex-row">
        {images?.map((image, i) => (
          <img
            src={`${BASE_URL}categories/product_image/image/${image}`}
            className={
              sliderData === image
                ? "image-thumbnil clicked-image img-thumbnail"
                : "image-thumbnil img-thumbnail"
            }
            alt={`Thumbnail for ${image} Gallery`}
            onClick={() => {
              hendleClick(i);
            }}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGalleryDetails;
