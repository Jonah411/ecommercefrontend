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
      <td className="table-light p-4 table-child">{cart?.product?.name}</td>
      <td className="table-light p-4 table-child">{cart?.product?.price}</td>
      <td className="table-light p-4 table-child">
        {/* <Quantity
          quantityValue={cart?.quantity}
          quantityChange={quantityChange}
        /> */}
        {cart?.product?.simple_product && (
          <>
            <Quantity
              index={cartIndex}
              onQuantityChange={(newQuantity) =>
                handleQuantityChange(newQuantity, cartIndex)
              }
              quantityValue={cart?.quantity}
              soldIndividually={
                cart?.product?.simple_product?.quantity_status ===
                "sold_individually"
                  ? true
                  : false
              }
              maxValue={
                cart?.product?.simple_product?.backorders_status ===
                  "Do Not Allow" &&
                cart?.product?.simple_product?.stock_quantity
              }
              minValue={cart?.product?.simple_product?.min_stock_quantity}
              backordersstatus={
                cart?.product?.simple_product?.backorders_status
              }
            />
            <div className="product-price">
              {cart?.product?.simple_product?.quantity_status ===
                "sold_individually" && (
                <p className="fs-6">Limit purchases to 1 item per order</p>
              )}
            </div>
          </>
        )}
        {cart?.product?.variable_product && (
          <>
            <Quantity
              index={cartIndex}
              onQuantityChange={(newQuantity) =>
                handleQuantityChange(newQuantity, cartIndex)
              }
              quantityValue={cart?.quantity}
              soldIndividually={
                cart?.product?.variable_product?.quantity_status ===
                "sold_individually"
                  ? true
                  : false
              }
              maxValue={
                cart?.product?.variable_product?.backorders_status ===
                  "Do Not Allow" &&
                cart?.product?.variable_product?.stock_quantity
              }
              minValue={cart?.product?.variable_product?.min_stock_quantity}
              backordersstatus={
                cart?.product?.variable_product?.backorders_status
              }
            />
            <div className="product-price">
              {cart?.product?.variable_product?.quantity_status ===
                "sold_individually" && (
                <p className="fs-6">Limit purchases to 1 item per order</p>
              )}
            </div>
          </>
        )}
      </td>
      <td className="table-light p-4 table-child">
        {(cart?.product?.price * cart?.quantity).toFixed(1)}
      </td>
    </>
  );
};

export default CartProduct;
