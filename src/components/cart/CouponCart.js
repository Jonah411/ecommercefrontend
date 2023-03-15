import React, { useEffect, useState } from "react";
import { useApplycouponMutation } from "../../feature/profileReducer/authProfile";
import { toast } from "react-toastify";
import AlertToast from "../common/AlertToast";

const CouponCart = ({ cartId, totalPriceChange }) => {
  const [
    applycoupon,
    { data: couponData, isSuccess: couponSuccess, error, isError },
  ] = useApplycouponMutation();
  const init = { couponCode: "" };
  const [couponForm, setCouponForm] = useState(init);
  const [isSubmit, setIsSubmit] = useState(false);
  const [couponError, setCouponError] = useState({});
  const couponHandleChange = (e) => {
    const { name, value } = e.target;
    setCouponForm({ ...couponForm, [name]: value });
  };
  const handleCouponClick = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setCouponError(validate(couponForm));
  };
  const validate = (value) => {
    const error = {};
    if (!value.couponCode) {
      error.couponCode = "Coupon Code is Required";
    }
    return error;
  };
  useEffect(() => {
    if (Object.keys(couponError).length === 0 && isSubmit) {
      let data = {
        cartId: cartId && cartId,
        couponCode: couponForm?.couponCode,
      };
      applycoupon(data);
    }
  }, [couponError, isSubmit, couponForm, cartId, applycoupon]);
  useEffect(() => {
    if (couponSuccess) {
      if (couponData?.status === true) {
        toast.success(`${couponData?.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        couponData && totalPriceChange(couponData?.totalPrice);
      }
    }
    if (isError) {
      toast.error(`${error?.data?.message}`, {
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
  }, [couponSuccess, couponData, error, isError, totalPriceChange]);
  return (
    <>
      <div className="coupon ">
        <input
          className="form-control p-3"
          placeholder="Enter coupon code"
          name="couponCode"
          onChange={couponHandleChange}
        />
        <button
          className="btn btn-coupon p-3"
          onClick={(e) => handleCouponClick(e)}
        >
          Apply Coupon
        </button>
      </div>
      <p className="text-danger fw-bold">{couponError.couponCode}</p>
      <AlertToast />
    </>
  );
};

export default CouponCart;
