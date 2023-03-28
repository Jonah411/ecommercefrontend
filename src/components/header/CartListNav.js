import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/ConstaltsVariables";
import { removecheckoutDetails } from "../../feature/loginReducer/loginReducer";

const CartListNav = ({ price, cart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="cart-content">
      <div className="cart-content-body">
        {cart?.map((data, index) => {
          return (
            <div className="d-flex justify-content-between mb-2" key={index}>
              <div>
                <p className="text-light m-0">{data?.product?.name}</p>
                <p className="text-muted m-0">
                  £{data?.product?.price} * {data?.quantity}
                </p>
              </div>
              <div className="">
                <img
                  src={`${BASE_URL}categories/product_image/image/${data?.product?.product_image}`}
                  className="rounded"
                  alt="..."
                  width={50}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="cart-content-footer">
        <div className="text-center mb-2">
          <span className="text-muted">
            SubTotal: <span className="text-light">£{price}</span>
          </span>
        </div>
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              navigate("/cart");
            }}
          >
            View Cart
          </button>
          <button
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              dispatch(removecheckoutDetails());
              navigate("/checkout");
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartListNav;
