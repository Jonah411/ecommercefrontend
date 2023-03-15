import React, { useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import { FaExclamationCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import { useGetAllCartQuery } from "../../feature/profileReducer/authProfile";
import CouponCart from "../cart/CouponCart";
import ProductCheckout from "./ProductCheckout";
import { useLocation } from "react-router-dom";
import BillingAddressCheckout from "./BillingAddressCheckout";

const CheckoutDashboard = () => {
  const auth = useSelector(getLoginDetails);
  const { data: cartData } = useGetAllCartQuery(auth?.id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const location = useLocation();
  const [codeView, setCodeView] = useState(false);
  const totalPrice = location?.state?.totalValue;
  const couponView = (e) => {
    e.preventDefault();
    setCodeView(!codeView);
  };
  const [totalValue, setTotalValue] = useState(totalPrice);
  const totalPriceChange = (data) => {
    setTotalValue(data);
  };

  return (
    <div className="p-3 container">
      <div className="mt-2 mb-3">
        <Breadcrumb title={"Checkout"} />
      </div>
      <div className="mt-2 mb-3">
        <h1 className="title-design">Checkout</h1>
      </div>
      {totalPrice ? (
        <div></div>
      ) : (
        <div className="mt-2 mb-3">
          <div className="alert-ecommerce">
            <p className="m-0">
              <FaExclamationCircle className="alert-ecommerce-logo" />
              Have a coupon?{" "}
              <span className="code-checkout" onClick={(e) => couponView(e)}>
                Click here to enter your code
              </span>
            </p>
          </div>
          <div className={codeView ? "d-block" : "d-none"}>
            <div className="mb-3">
              <p className="text-muted">
                If you have a coupon code, please apply it below.
              </p>
              <div className="row">
                <div className="col-12 col-sm-12 col-md-8 col-lg-6">
                  <CouponCart
                    cartId={cartData?.carts?._id}
                    totalPriceChange={totalPriceChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-2 mb-3">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6">
              <BillingAddressCheckout />
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <ProductCheckout
                cartData={cartData}
                totalValue={totalValue}
                totalPrice={totalPrice}
              />
              <div className="">
                <div className="alert-ecommerce">
                  <p className="m-0">
                    <FaExclamationCircle className="alert-ecommerce-logo" />
                    Please contact us if you require assistance or wish to make
                    alternate arrangements.
                  </p>
                </div>
              </div>
              <div className="place-order">
                <div className="d-grid">
                  <button className="btn btn-secondary p-4">Place Order</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDashboard;
