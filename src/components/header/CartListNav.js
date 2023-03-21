import React from "react";
import { BASE_URL } from "../../constants/ConstaltsVariables";

const CartListNav = ({ price, cart }) => {
  return (
    <div className="cart-content">
      <div className="cart-content-body">
        {cart?.map((data) => {
          return (
            <div className="d-flex justify-content-between mb-2">
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
          <button className="btn btn-primary">View Cart</button>
          <button className="btn btn-secondary">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartListNav;
