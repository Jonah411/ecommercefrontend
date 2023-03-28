import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import AddCart from "../common/AddCart";
import BuyCart from "../common/BuyCart";

const Details = ({ details }) => {
  const [productDetails, setProductDetails] = useState();
  useEffect(() => {
    setProductDetails(details);
  }, [details]);
  return (
    <div className="image-app p-2">
      <div className="card">
        <div className="card-body">
          <div className="product-details">
            <div className="product-tiltle">
              <h5 className="text-muted"> {productDetails?.name}</h5>
            </div>
            <div className="d-flex justify-content-between">
              <div className="product-price">
                <p> Price: {productDetails?.price}</p>
              </div>
              <Rating
                name="read-only"
                value={parseInt(productDetails?.rating_star?.rating_radio)}
                readOnly
                // onChange={(event, newValue) => {
                //   setValue(newValue);
                // }}
              />
            </div>
            <div className="product-field card">
              <div className="d-flex justify-content-between">
                <div className="product-price">
                  <p> Strength: </p>
                </div>
                <div className="">{productDetails?.product_strength}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="product-price">
                  <p> Pack Size: </p>
                </div>
                <div className="">{productDetails?.pack_size}</div>
              </div>
            </div>
            <div className="product-field">
              <div className="d-flex justify-content-between">
                <div className="product-price">
                  <p> Categories: </p>
                </div>
                <div className="">
                  {productDetails?.categories?.parent_categories?.name}
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="product-price">
                  <p>Sub Categories: </p>
                </div>
                <div className=""> {productDetails?.categories?.name}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="product-price">
                  <p>Brand:</p>
                </div>
                <div className="">{productDetails?.brands?.name}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-grid gap-2">
            <AddCart productId={productDetails?._id} />
            <BuyCart product={productDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
