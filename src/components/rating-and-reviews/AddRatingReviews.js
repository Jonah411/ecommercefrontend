import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/ConstaltsVariables";
import {
  useCreateRatingReviewsMutation,
  useGetProductsQuery,
} from "../../feature/profileReducer/authProfile";
import { AiOutlineStar } from "react-icons/ai";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import { toast } from "react-toastify";
import AlertToast from "../common/AlertToast";

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
  const navigate = useNavigate();
  const [createRatingReviews, { data, error, isSuccess, isError }] =
    useCreateRatingReviewsMutation();
  const [product, setProduct] = useState(productData && productData?.data[0]);
  useEffect(() => {
    setProduct(productData && productData?.data[0]);
  }, [productData]);
  const product_init = {
    productId: product?._id,
    rate_product: "",
    review_description: "",
    review_title: "",
    review_username: user ? user?.first_name : "",
  };
  const [rateReviews, setRateReviews] = useState(product_init);
  const [rateSubmit, setRateSubmit] = useState(false);
  const [rateError, setRateError] = useState(null);
  const [reviewImage, setReviewImage] = useState();
  const rateChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
      if (e.target.files) {
        let image = [];
        for (let i = 0; i < e.target.files.length; i++) {
          if (e.target.files[i].size <= 2000000) {
            image.push(e.target.files[i]);
            setReviewImage({ ...reviewImage, [name]: image });
          } else {
            toast.error("Image size Big", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      }
    } else {
      setRateReviews({ ...rateReviews, [name]: value });
    }
  };
  const rateClick = (e) => {
    e.preventDefault();
    setRateSubmit(true);
    setRateError(validation(rateReviews));
  };
  const validation = (values) => {
    const error = {};
    if (!values.rate_product) {
      error.rate_product = "Rating is required";
    }
    if (!values.review_description) {
      error.review_description = "Review description is required";
    }
    return error;
  };
  useEffect(() => {
    if (rateError && Object.keys(rateError).length === 0 && rateSubmit) {
      var formData = new FormData();
      formData.append("json_data", JSON.stringify(rateReviews));

      if (reviewImage) {
        Array.from(
          reviewImage?.review_image && reviewImage?.review_image
        ).forEach((item) => {
          formData.append("review_image", item);
        });
      }
      createRatingReviews(formData);
    }
  }, [
    rateError,
    rateSubmit,
    rateReviews,
    reviewImage,
    product,
    createRatingReviews,
  ]);
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setRateSubmit(false);
      setTimeout(() => {
        navigate(`/product_details/${product?._id}`);
      }, 2001);
    }
    if (isError) {
      toast.error(error?.data?.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setRateSubmit(false);
    }
  }, [isSuccess, isError, data, product, error, navigate]);
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
              {(parseInt(product?.rating_star?.rating_radio) === 4 ||
                parseInt(product?.rating_star?.rating_radio) === 5) && (
                <p className="fw-bold bg-success m-0 ">
                  {/* {product?.rating_star} */}
                  <AiOutlineStar />
                  {parseInt(product?.rating_star?.rating_radio)}
                  <span className="ms-2">
                    ( {product?.rating_star?.rating.length} rating)
                  </span>
                </p>
              )}
              {(parseInt(product?.rating_star?.rating_radio) === 3 ||
                parseInt(product?.rating_star?.rating_radio) === 2) && (
                <p className="fw-bold bg-warning m-0 p-2">
                  {/* {product?.rating_star} */}
                  <AiOutlineStar />
                  {parseInt(product?.rating_star?.rating_radio)}
                  <span className="ms-2">
                    ( {product?.rating_star?.rating.length} rating)
                  </span>
                </p>
              )}
              {parseInt(product?.rating_star?.rating_radio) === 1 && (
                <p className="fw-bold bg-danger m-0 p-2">
                  {/* {product?.rating_star} */}
                  <AiOutlineStar />
                  {parseInt(product?.rating_star?.rating_radio)}
                  <span className="ms-2">
                    {product?.rating_star?.rating.length} rating
                  </span>
                </p>
              )}
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
            {rateError && Object.keys(rateError).length !== 0 && (
              <div className="rating-form ps-2 danger-alert-ecommerce ">
                <p>{rateError?.rate_product}</p>
                <p>{rateError?.review_description}</p>
              </div>
            )}
            <div className="rating-form background-rating">
              <div className="">
                <h4 className="rate-title">Rate this product</h4>
                <Rating
                  name="rate_product"
                  className="mt-4"
                  //   value={value}
                  onChange={rateChange}
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
                      name="review_description"
                      className="form-control"
                      placeholder="Enter your reviews"
                      rows="3"
                      onChange={rateChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Title:</label>
                    <input
                      type="text"
                      name="review_title"
                      className="form-control"
                      placeholder="review title"
                      value={rateReviews?.review_title}
                      onChange={rateChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="review title"
                      name="review_username"
                      value={user?.first_name}
                      onChange={rateChange}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Review Product Image</label>
                    <input
                      className="form-control"
                      name="review_image"
                      type="file"
                      onChange={rateChange}
                      multiple
                    />
                  </div>
                </form>
                <div className="d-flex justify-content-end mb-3">
                  <button
                    className="btn btn-outline-success"
                    onClick={(e) => rateClick(e)}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AlertToast />
    </div>
  );
};

export default AddRatingReviews;
