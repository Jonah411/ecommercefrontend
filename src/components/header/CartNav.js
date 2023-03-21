import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartNav = ({ cart, price }) => {
  return (
    <div className=" nav-menu d-flex justify-content-around ">
      <span className="text-light">£{price}</span>
      <span className="m-0 p-0 text-muted">
        {cart?.length} {cart?.length === 1 ? "item" : "items"}
      </span>
      <span className="m-0 p-0 text-muted">
        <AiOutlineShoppingCart />
      </span>
    </div>
  );
};

export default CartNav;
