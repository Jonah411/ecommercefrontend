import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/ConstaltsVariables";
import { useGetProductsQuery } from "../../feature/profileReducer/authProfile";
import { AiOutlineStar } from "react-icons/ai";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";

const AddRatingReviews = () => {
  const user = useSelector(getLoginDetails);
  let { id } = useParams();
  let list = {
    id: id,
    type: "product",
  };
  const { data: productData } = useGetProductsQuery(list, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [product, setProduct] = useState(productData && productData?.data[0]);
  useEffect(() => {
    setProduct(productData && productData?.data[0]);
  }, [productData]);
  console.log(user);
  return (
    <div className="container">
      <div className="review-page">
        <div className="d-flex justify-content-between">
          <div className="title">
            <h4>Rating And Reviews</h4>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <div>
              <p className="fw-bold m-0">{product?.name}</p>
              <p className="fw-bold bg-warning m-0">
                {product?.rating_star}
                <AiOutlineStar />
                (100)
              </p>
            </div>
            <img
              src={`${BASE_URL}categories/product_image/image/${product?.product_image}`}
              className="img-thumbnail"
              alt={`Thumbnail for  Gallery`}
              height={30}
              width="10%"
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-5 col-lg-4 p-0">
            <div className="start-title background-rating">
              <h6 className="title-form">What make a good review?</h6>
            </div>
            <div className="start-title background-rating">
              <p className="title-form m-0">How you use this product?</p>
              <p className="title-question">
                Your review should be about your experience with the product
              </p>
            </div>
            <div className="start-title background-rating">
              <p className="title-form m-0">Why review a product?</p>
              <p className="title-question">
                Your valuable feedback will help fellow shoppers decide!
              </p>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-5 col-lg-8  p-0">
            <div className="rating-form background-rating">
              <div className="">
                <h4 className="rate-title">Rate this product</h4>
                <Rating
                  name="simple-controlled"
                  className="mt-4"
                  //   value={value}
                  //   onChange={(event, newValue) => {
                  //     setValue(newValue);
                  //   }}
                />
              </div>
            </div>
            <div className="rating-form background-rating">
              <div className="">
                <h4 className="rate-title">Review this product</h4>
                <form className="">
                  <div className="mb-3 mt-4">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      placeholder="Enter your reviews"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Title:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="review title"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="review title"
                      value={user?.first_name}
                      disabled
                    />
                  </div>
                  <div class="mb-3">
                    <label className="form-label">Review Product Image</label>
                    <input className="form-control" type="file" multiple />
                  </div>
                </form>
                <div className="d-flex justify-content-end mb-3">
                  <button className="btn btn-outline-success">SUBMIT</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRatingReviews;
