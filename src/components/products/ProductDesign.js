import React, { useEffect, useState } from "react";

import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import WishListIcon from "../common/WishListIcon";
import AddCart from "../common/AddCart";
import BuyCart from "../common/BuyCart";

const ProductDesign = ({
  productData,
  title,
  routeList,
  wishListData,
  listView,
}) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState({});
  useEffect(() => {
    if (productData) {
      setProducts(productData);
    }
  }, [productData]);
  return (
    <div className="card">
      <div className="card-header">
        <WishListIcon
          image={products?.product_image}
          productId={products?._id}
          productWishList={products?.wishlist?.wishlist}
          routeList={routeList}
          wishListData={wishListData}
        />
      </div>
      <div className="card-body">
        <div className="">
          <h5>{products.name}</h5>
        </div>
        <div className="d-flex justify-content-between">
          <h6>Price: {products.price}</h6>
          <Rating
            name="read-only"
            value={parseInt(products?.rating_star?.rating_radio)}
            readOnly
            // onChange={(event, newValue) => {
            //   setValue(newValue);
            // }}
          />
        </div>
      </div>
      <div className="card-footer">
        <div className=" ">
          <div className="d-flex justify-content-between gap-2">
            <AddCart productId={products._id} />
            <BuyCart product={products} />
          </div>
          <div className="d-grid gap-2 mt-2">
            <button
              className="btn btn-secondary"
              onClick={() => {
                navigate(`/product_details/${products._id}`);
              }}
            >
              <span className="product-font">PRODUCT DETAILS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDesign;
