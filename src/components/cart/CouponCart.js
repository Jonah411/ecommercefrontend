import React, { useEffect, useState } from "react";
import { useApplycouponMutation } from "../../feature/profileReducer/authProfile";
import { toast } from "react-toastify";
import AlertToast from "../common/AlertToast";

const CouponCart = ({ cartId, totalPriceChange, totalPrice, couponChange }) => {
  const [
    applycoupon,
    { data: couponData, isSuccess: couponSuccess, error, isError },
  ] = useApplycouponMutation();
  const [couponCode, setCouponCode] = useState();
  useEffect(() => {
    setCouponCode(couponData?.coupon);
  }, [couponData]);
  useEffect(() => {
    couponChange(couponCode);
  }, [couponCode, couponChange]);
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
        totalProductPrice: totalPrice && totalPrice,
      };
      applycoupon(data);
    }
  }, [couponError, isSubmit, couponForm, cartId, totalPrice, applycoupon]);
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
        setIsSubmit(false);
      }
    }
    if (isError) {
      setIsSubmit(false);
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
  }, [couponSuccess, couponData, isError, error]);
  useEffect(() => {
    totalPriceChange(couponData?.totalPrice && couponData?.totalPrice);
  }, [couponData, totalPriceChange]);
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
