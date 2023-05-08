import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import Quantity from "../cart/Quantity";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkoutDetails } from "../../feature/loginReducer/loginReducer";
import CouponCart from "../cart/CouponCart";
import AlertCoupon from "../design/AlertCoupon";

const BuyCart = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productData, setProductData] = useState(product);
  useEffect(() => {
    setProductData(product);
  }, [product]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const quantityChange = (data) => {
  //   setQuantity(data);
  // };

  const minStockQuantity = productData?.simple_product?.min_stock_quantity;
  const [quantity, setQuantity] = useState(
    minStockQuantity ? minStockQuantity : 1
  );
  useEffect(() => {
    setQuantity(minStockQuantity ? minStockQuantity : 1);
  }, [minStockQuantity]);
  const [totalPrice, setToatalPrice] = useState(0);
  const [totalValue, setTotalValue] = useState();
  const [coupon, setCoupon] = useState();
  useEffect(() => {
    if (quantity) {
      let total = productData?.price * quantity;
      setToatalPrice(total);
    }
  }, [quantity, productData]);
  const handleClick = () => {
    let cartData = {
      carts: {
        items: [
          {
            product: {
              _id: productData?._id,
              name: productData?.name,
              price: productData?.price,
            },
            quantity: quantity,
          },
        ],
      },
      totalPrice: totalPrice,
    };
    // let productDetails = [
    //   [
    //     {
    //       product: {
    //         _id: productData?._id,
    //         name: productData?.name,
    //         price: productData?.price,
    //       },
    //       quantity: quantity,
    //     },
    //   ],
    //   { totalPrice: totalPrice },
    //   { type: "singleCart" },
    // ];
    dispatch(checkoutDetails(cartData));
    navigate("/checkout", { state: { totalValue, coupon } });
  };
  const totalPriceChange = (data) => {
    setTotalValue(data);
  };
  const handleQuantityChange = (newQuantity, index) => {
    setQuantity(newQuantity);
  };
  const couponChange = (data) => {
    setCoupon(data);
  };
  return (
    <>
      <Button color="error" variant="contained" onClick={handleShow}>
        <span className="product-font">Buy Product</span>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> {productData?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p> Price: {productData?.price}</p>
            {productData?.simple_product && (
              <p>
                Quantity:
                <Quantity
                  onQuantityChange={(newQuantity) =>
                    handleQuantityChange(newQuantity)
                  }
                  quantityValue={1}
                  soldIndividually={
                    productData?.simple_product?.quantity_status ===
                    "sold_individually"
                      ? true
                      : false
                  }
                  maxValue={
                    productData?.simple_product?.backorders_status ===
                      "Do Not Allow" &&
                    productData?.simple_product?.stock_quantity
                  }
                  minValue={productData?.simple_product?.min_stock_quantity}
                  backordersstatus={
                    productData?.simple_product?.backorders_status
                  }
                />
                <div className="product-price">
                  {productData?.simple_product?.quantity_status ===
                    "sold_individually" && (
                    <p className="fs-6">Limit purchases to 1 item per order</p>
                  )}
                </div>
              </p>
            )}
            {productData?.variable_product && (
              <p>
                Quantity:
                <Quantity
                  onQuantityChange={(newQuantity) =>
                    handleQuantityChange(newQuantity)
                  }
                  quantityValue={1}
                  soldIndividually={
                    productData?.variable_product?.quantity_status ===
                    "sold_individually"
                      ? true
                      : false
                  }
                  maxValue={
                    productData?.variable_product?.backorders_status ===
                      "Do Not Allow" &&
                    productData?.variable_product?.stock_quantity
                  }
                  minValue={productData?.variable_product?.min_stock_quantity}
                  backordersstatus={
                    productData?.variable_product?.backorders_status
                  }
                />
                <div className="product-price">
                  {productData?.variable_product?.quantity_status ===
                    "sold_individually" && (
                    <p className="fs-6">Limit purchases to 1 item per order</p>
                  )}
                </div>
              </p>
            )}
            <p>
              <CouponCart
                cartId={null}
                totalPriceChange={totalPriceChange}
                totalPrice={totalPrice}
                couponChange={couponChange}
              />
            </p>
            <div className="cart-collaterals d-flex justify-content-end">
              <div className="cart_totals">
                <h2 className="total-h2">Totals</h2>
                {totalValue && <AlertCoupon />}
                <table cellSpacing="0" className="table-light table bordered">
                  <tbody>
                    <tr className="cart-subtotal">
                      <th className="p-4 table-secondary table-total table-child">
                        Subtotal
                      </th>
                      <td className="table-total table-child">
                        <span className="cart-Price-amount amount">
                          <bdi>{totalPrice.toFixed(1)}</bdi>
                        </span>
                      </td>
                    </tr>
                    {totalValue && (
                      <tr className="order-total">
                        <th className="p-4 table-secondary table-total table-child">
                          Coupon ({coupon?.code})
                        </th>
                        <td className="table-total table-child">
                          <strong>
                            <span className="cart-Price-amount amount">
                              <bdi>
                                - {(totalPrice - totalValue).toFixed(1)}
                              </bdi>
                            </span>
                          </strong>
                        </td>
                      </tr>
                    )}
                    <tr className="order-total">
                      <th className="p-4 table-secondary table-total table-child">
                        Total
                      </th>
                      <td className="table-total table-child">
                        <strong>
                          <span className="cart-Price-amount amount">
                            <bdi>
                              {" "}
                              {(totalValue ? totalValue : totalPrice).toFixed(
                                1
                              )}
                            </bdi>
                          </span>
                        </strong>{" "}
                      </td>
                    </tr>
                    {totalValue && (
                      <tr>
                        <td
                          colSpan="2"
                          className="actions-table"
                          style={{ background: "#fbfbfb" }}
                        >
                          <p className="text-success text-center m-0 p-2">
                            Your total savings on this order{" "}
                            {(totalPrice - totalValue).toFixed(1)}
                          </p>
                          <p className="text-muted text-center">
                            {coupon && coupon?.description}
                          </p>
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td
                        colSpan="2"
                        className="actions-table"
                        style={{ background: "#fbfbfb" }}
                      >
                        <div className="d-grid">
                          <button
                            className="btn btn-secondary p-3"
                            onClick={() => handleClick()}
                          >
                            Checkout
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="contained" color="secondary" onClick={handleClick}>
            CheckOut
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default BuyCart;
