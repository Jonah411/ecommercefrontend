import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getLoginDetails,
  removecheckoutDetails,
} from "../../feature/loginReducer/loginReducer";
import {
  useGetAllCartQuery,
  useUpdateCartMutation,
} from "../../feature/profileReducer/authProfile";
import CartProduct from "./CartProduct";
import { toast } from "react-toastify";
import AlertToast from "../common/AlertToast";
import CouponCart from "./CouponCart";
import Breadcrumb from "../common/Breadcrumb";
import AlertCoupon from "../design/AlertCoupon";

const CartDashboard = () => {
  const auth = useSelector(getLoginDetails);
  const { data: cartData } = useGetAllCartQuery(auth?.id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateCart, { data, isSuccess }] = useUpdateCartMutation();
  const [cart, setCart] = useState([]);
  const [isCartDirty, setIsCartDirty] = useState(false);
  const [totalValue, setTotalValue] = useState();
  useEffect(() => {
    if (cartData?.carts?.items) {
      setCart(cartData?.carts?.items);
    }
  }, [cartData]);

  const handleQuantityChange = (newQuantity, index) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[index] = {
        ...prevCart[index],
        quantity: newQuantity,
      };
      return newCart;
    });
    setIsCartDirty(true);
  };
  const handleUpdateCart = (e) => {
    e.preventDefault();
    let data = {
      userId: auth?.id,
      items: cart,
    };
    updateCart(data);
  };
  const toastRef = useRef(null);

  useEffect(() => {
    if (isSuccess && data) {
      const { status, message } = data;
      if (status) {
        toastRef.current = toast.success(`${message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          window.location.reload();
        }, 300);
      } else {
        toastRef.current = toast.error(`${message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }, [isSuccess, data]);

  useEffect(() => {
    return () => {
      if (toastRef.current) {
        toast.dismiss(toastRef.current);
      }
    };
  }, []);
  const totalPriceChange = (data) => {
    setTotalValue(data);
  };
  return (
    <div className="p-3 container">
      <div className="mt-2 mb-3">
        <Breadcrumb title={"Cart"} />
      </div>
      <div className="mt-2 mb-3">
        <h1 className="title-design">Cart</h1>
      </div>
      <div className="mt-2 mb-3">
        <div className="table-responsive">
          <table className="table table-design">
            <thead className="table-secondary  ">
              <tr className="p-4">
                <th scope="col" className="p-4">
                  #
                </th>
                <th scope="col" className="p-4">
                  #
                </th>
                <th scope="col" className="p-4">
                  Name
                </th>
                <th scope="col" className="p-4">
                  Price
                </th>
                <th scope="col" className="p-4">
                  Quantity
                </th>
                <th scope="col" className="p-4">
                  SubTotal
                </th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((data, index) => {
                return (
                  <tr className="table-parent" key={data?.product?._id}>
                    <CartProduct
                      cartList={data}
                      cartIndex={index}
                      handleQuantityChange={handleQuantityChange}
                    />
                  </tr>
                );
              })}

              <tr>
                <td
                  colSpan="6"
                  className="actions-table"
                  style={{ background: "#fbfbfb" }}
                >
                  <div className="d-flex justify-content-between">
                    <CouponCart
                      cartId={cartData?.carts?._id}
                      totalPriceChange={totalPriceChange}
                    />
                    <div>
                      <button
                        className="btn btn-coupon p-3"
                        disabled={!isCartDirty}
                        onClick={(e) => handleUpdateCart(e)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="cart-collaterals d-flex justify-content-end">
        <div className="cart_totals">
          <h2 className="total-h2">Cart Totals</h2>
          {totalValue && <AlertCoupon />}
          <table cellSpacing="0" className="table-light table bordered">
            <tbody>
              <tr className="cart-subtotal">
                <th className="p-4 table-secondary table-total table-child">
                  Subtotal
                </th>
                <td className="table-total table-child">
                  <span className="cart-Price-amount amount">
                    <bdi>{cartData?.totalPrice}</bdi>
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
                      <bdi>
                        {totalValue ? totalValue : cartData?.totalPrice}
                      </bdi>
                    </span>
                  </strong>
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
                      onClick={() => {
                        dispatch(removecheckoutDetails());
                        navigate("/checkout", { state: { totalValue } });
                      }}
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
      <AlertToast />
    </div>
  );
};

export default CartDashboard;
