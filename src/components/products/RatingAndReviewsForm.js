import React from "react";
import { Link } from "react-router-dom";

const RatingAndReviewsForm = ({ details }) => {
  return (
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
  );
};

export default RatingAndReviewsForm;
