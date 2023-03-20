import React, { useEffect, useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import { FaExclamationCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import {
  useAddOrderMutation,
  useGetAllCartQuery,
} from "../../feature/profileReducer/authProfile";
import CouponCart from "../cart/CouponCart";
import ProductCheckout from "./ProductCheckout";
import { useLocation } from "react-router-dom";
import BillingAddressCheckout from "./BillingAddressCheckout";
import StripeCheckout from "react-stripe-checkout";
import Modal from "react-bootstrap/Modal";

const STRIPE_PUBLISHABLE =
  "pk_test_51LDlCzSJVnTGa9XXqnB5DaHKrB7FgaXDTKnM0cGXo6cEVoCovGFjPOzL7DdqI9oYhMZ9LOLU8t1y5f44IHtVHnjv00DYLJzAf6";

const CheckoutDashboard = () => {
  const auth = useSelector(getLoginDetails);
  const { data: cartData } = useGetAllCartQuery(auth?.id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [addOrder, { data, isSuccess }] = useAddOrderMutation();
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

  const init = {
    first_name: "",
    last_name: "",
    company_name: "",
    street_name: "",
    apartment_name: "",
    town_city: "",
    post_code: "",
    email: "",
    phone_number: "",
    additional_inform: "",
  };
  const [billingForm, setBillingForm] = useState(init);
  const [billingSubmit, setBillingSubmit] = useState(false);
  const [billingError, setBillingError] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChandeBilling = (e) => {
    const { name, value } = e.target;
    setBillingForm({ ...billingForm, [name]: value });
  };
  const handleOrder = (e) => {
    e.preventDefault();
    setBillingSubmit(true);
    setBillingError(validate(billingForm));
  };
  const validate = (value) => {
    const error = {};
    if (!value.first_name) {
      error.first_name = "First Name is required";
    }
    if (!value.last_name) {
      error.last_name = "Last Name is required";
    }
    if (!value.street_name) {
      error.street_name = "Street Name is required";
    }
    if (!value.town_city) {
      error.town_city = "Town/City is required";
    }
    if (!value.post_code) {
      error.post_code = "Postcode is required";
    }
    if (!value.email) {
      error.email = "Email is required";
    }
    if (!value.phone_number) {
      error.phone_number = "Phone number is required";
    }
    return error;
  };
  useEffect(() => {
    if (Object.keys(billingError).length === 0 && billingSubmit) {
      //console.log(cartData);

      handleShow();

      //console.log(patch);
    }
  }, [
    billingError,
    billingSubmit,
    billingForm,
    cartData,
    totalPrice,
    totalValue,
    auth,
  ]);
  const checkoutOrder = (token) => {
    let patch = {
      token,
      user: auth?.id,
      items: cartData?.carts?.items,
      billingaddress: [billingForm],
      subtotalPrice: cartData?.totalPrice,
      totalPrice: totalValue
        ? totalValue
        : totalPrice
        ? totalPrice
        : cartData?.totalPrice,
    };
    addOrder(patch);
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
      {Object.keys(billingError).length !== 0 && (
        <div className="mt-2 mb-3">
          <div className="danger-alert-ecommerce">
            <p className="m-0">
              <span className="code-checkout-error">
                {billingError.first_name}
              </span>
            </p>
            <p className="m-0">
              <span className="code-checkout-error">
                {billingError.last_name}
              </span>
            </p>
            <p className="m-0">
              <span className="code-checkout-error">
                {billingError.street_name}
              </span>
            </p>
            <p className="m-0">
              <span className="code-checkout-error">
                {billingError.town_city}
              </span>
            </p>
            <p className="m-0">
              <span className="code-checkout-error">
                {billingError.post_code}
              </span>
            </p>
            <p className="m-0">
              <span className="code-checkout-error">{billingError.email}</span>
            </p>
            <p className="m-0">
              <span className="code-checkout-error">
                {billingError.phone_number}
              </span>
            </p>
          </div>
        </div>
      )}

      <div className="mt-2 mb-3">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6">
              <BillingAddressCheckout
                handleChandeBilling={handleChandeBilling}
                billingError={billingError}
              />
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
                  <button
                    className="btn btn-secondary p-4"
                    onClick={(e) => {
                      handleOrder(e);
                    }}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <StripeCheckout
            token={checkoutOrder} // callback function to handle successful payment
            amount={
              totalValue
                ? totalValue
                : totalPrice
                ? totalPrice
                : cartData?.totalPrice * 100
            } // amount to charge in cents
            currency="INR" // currency code
            stripeKey={STRIPE_PUBLISHABLE} // your Stripe API publishable key
          />
        </Modal.Body>
        <Modal.Footer>kkkk</Modal.Footer>
      </Modal>
    </div>
  );
};

export default CheckoutDashboard;
