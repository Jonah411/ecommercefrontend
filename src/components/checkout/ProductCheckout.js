import React, { useEffect, useState } from "react";

const ProductCheckout = ({ cartData, totalValue, totalPrice, coupon }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (cartData?.carts?.items) {
      setCart(cartData?.carts?.items);
    }
  }, [cartData]);
  return (
    <div className="mt-3">
      <div className="container-fluid p-0">
        <div className="heading">
          <h3 style={{ color: "#484c51" }}>Your Order</h3>
        </div>
        <div className="mt-3">
          <div className="table-responsive">
            <table className="table checkout-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SubTotal</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((data, index) => {
                  return (
                    <tr className="table-parent" key={data?.product?._id}>
                      <td>
                        {data?.product?.name} * {data?.quantity}
                      </td>
                      <td>
                        {" "}
                        {(data?.product?.price * data?.quantity).toFixed(1)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="cart-subtotal">
                  <th>Subtotal</th>
                  <td>
                    <span className="Price-amount amount">
                      <bdi>{cartData?.totalPrice}</bdi>
                    </span>
                  </td>
                </tr>

                {(totalPrice || totalValue) && (
                  <tr className="order-total">
                    <th className="p-4 table-secondary table-total table-child">
                      Coupon ({coupon?.code})
                    </th>
                    <td className="table-total table-child">
                      <strong>
                        <span className="cart-Price-amount amount">
                          <bdi>
                            -{" "}
                            {(
                              cartData?.totalPrice - (totalPrice || totalValue)
                            ).toFixed(1)}
                          </bdi>
                        </span>
                      </strong>
                    </td>
                  </tr>
                )}
                <tr className="order-total">
                  <th>Total</th>
                  <td>
                    <strong>
                      <span className="Price-amount amount">
                        <bdi>
                          {totalPrice
                            ? totalPrice?.toFixed(1)
                            : totalValue
                            ? totalValue?.toFixed(1)
                            : cartData?.totalPrice?.toFixed(1)}
                        </bdi>
                      </span>
                    </strong>
                  </td>
                </tr>
                {(totalPrice || totalValue) && (
                  <tr>
                    <td
                      colSpan="2"
                      className="actions-table"
                      style={{ background: "#fbfbfb" }}
                    >
                      <p className="text-success text-center m-0 p-2">
                        Your total savings on this order{" "}
                        {(
                          cartData?.totalPrice - (totalPrice || totalValue)
                        ).toFixed(1)}
                      </p>
                      <p className="text-muted text-center">
                        {coupon && coupon?.description}
                      </p>
                    </td>
                  </tr>
                )}
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCheckout;
