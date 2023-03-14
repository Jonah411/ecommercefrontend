import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/ConstaltsVariables";
import Quantity from "./Quantity";
import DeleteCart from "./DeleteCart";

const CartProduct = ({ cartList, cartIndex, handleQuantityChange }) => {
  const [cart, setCart] = useState(cartList);
  useEffect(() => {
    setCart(cartList);
  }, [cartList]);
  return (
    <>
      <td className="table-light p-4 table-child">
        <DeleteCart cartData={cart?.product?._id} />
      </td>
      <td className="table-light p-4 table-child">
        <img
          src={`${BASE_URL}categories/product_image/image/${cart?.product?.product_image}`}
          className="rounded"
          alt="..."
          width={100}
        />
      </td>
      <td className="table-light p-4 table-child">{cart?.product.name}</td>
      <td className="table-light p-4 table-child">{cart?.product.price}</td>
      <td className="table-light p-4 table-child">
        {/* <Quantity
          quantityValue={cart?.quantity}
          quantityChange={quantityChange}
        /> */}
        <Quantity
          index={cartIndex}
          onQuantityChange={(newQuantity) =>
            handleQuantityChange(newQuantity, cartIndex)
          }
          quantityValue={cart?.quantity}
        />
      </td>
      <td className="table-light p-4 table-child">
        {cart.product.price * cart.quantity}
      </td>
    </>
  );
};

export default CartProduct;
