import React from "react";
import { Link } from "react-router-dom";
import PaginatedItems from "../design/PaginatedItems ";
import Rating from "../rating-and-reviews/Rating";

const RatingAndReviewsForm = ({ details }) => {
  return (
    <div>
      <div className="container form-product">
        <div className="d-flex justify-content-between">
          <div className="title">
            <h4>Rating And Reviews</h4>
          </div>
          <Link
            to={`/product_details/${details?._id}/create-review`}
            className="btn btn-secondary"
          >
            Rate Product
          </Link>
        </div>
      </div>
      <div className="">
        <Rating itemslist={details?.rating_star} />
        <PaginatedItems itemsPerPage={5} itemslist={details?.rating_star} />,
      </div>
    </div>
  );
};

export default RatingAndReviewsForm;
