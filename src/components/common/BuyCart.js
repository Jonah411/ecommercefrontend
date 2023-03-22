import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import Quantity from "../cart/Quantity";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkoutDetails } from "../../feature/loginReducer/loginReducer";
import CouponCart from "../cart/CouponCart";

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
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setToatalPrice] = useState(0);
  const [totalValue, setTotalValue] = useState();
  useEffect(() => {
    if (quantity) {
      let total = productData?.price * quantity;
      console.log(total);
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
    navigate("/checkout", { state: { totalValue } });
  };
  const totalPriceChange = (data) => {
    setTotalValue(data);
  };
  const handleQuantityChange = (newQuantity, index) => {
    setQuantity(newQuantity);
  };
  return (
    <div className="d-flex justify-content-end">
      <Button color="error" variant="contained" onClick={handleShow}>
        Buy Product
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
            <p>
              {" "}
              Quantity:
              <Quantity
                onQuantityChange={(newQuantity) =>
                  handleQuantityChange(newQuantity)
                }
                quantityValue={1}
              />
            </p>
            <p>
              <CouponCart
                cartId={null}
                totalPriceChange={totalPriceChange}
                totalPrice={totalPrice}
              />
            </p>
            <div className="cart-collaterals d-flex justify-content-end">
              <div className="cart_totals">
                <h2 className="total-h2">Cart Totals</h2>
                <table cellSpacing="0" className="table-light table bordered">
                  <tbody>
                    <tr className="cart-subtotal">
                      <th className="p-4 table-secondary table-total table-child">
                        Subtotal
                      </th>
                      <td className="table-total table-child">
                        <span className="cart-Price-amount amount">
                          <bdi>{totalPrice}</bdi>
                        </span>
                      </td>
                    </tr>

                    <tr className="order-total">
                      <th className="p-4 table-secondary table-total table-child">
                        Total
                      </th>
                      <td className="table-total table-child">
                        <strong>
                          <span className="cart-Price-amount amount">
                            <bdi> {totalValue ? totalValue : totalPrice}</bdi>
                          </span>
                        </strong>{" "}
                      </td>
                    </tr>
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
    </div>
  );
};

export default BuyCart;
