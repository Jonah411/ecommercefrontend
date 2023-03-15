import React, { useEffect, useState } from "react";

const ProductCheckout = ({ cartData, totalValue, totalPrice }) => {
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
                      <td> {data?.product?.price * data?.quantity}</td>
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

                <tr className="order-total">
                  <th>Total</th>
                  <td>
                    <strong>
                      <span className="Price-amount amount">
                        <bdi>
                          {totalPrice
                            ? totalPrice
                            : totalValue
                            ? totalValue
                            : cartData?.totalPrice}
                        </bdi>
                      </span>
                    </strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCheckout;
