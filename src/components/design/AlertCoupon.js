import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

const AlertCoupon = () => {
  return (
    <div className="">
      <div className="alert-ecommerce alert-ecommerce-success">
        <p className="m-0">
          <FaExclamationCircle className="alert-ecommerce-logo" />
          Coupon Applied
        </p>
      </div>
    </div>
  );
};

export default AlertCoupon;
