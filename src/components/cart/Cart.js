import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants/ConstaltsVariables";

import DeleteCart from "./DeleteCart";
import Quantity from "./Quantity";
import UpdateCart from "./UpdateCart";

const Cart = ({ product, productIndex, changeTotal }) => {
  // const { data: cartDetails } = useGetCartQuery(product?.items[0].product._id, {
  //   refetchOnMountOrArgChange: true,
  //   skip: false,
  // });

  const [cart, setCart] = useState();
  const [totalPrice, setToatalPrice] = useState();
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    setCart(product && product?.product);
  }, [product]);
  useEffect(() => {
    let total = parseFloat(
      Number(
        (cart?.price * (quantity ? quantity : product?.quantity)).toFixed(2)
      )
    );
    setToatalPrice(total);
  }, [product, quantity, cart?.price]);

  const totalChange = (data) => {
    let change = {
      totalPrice: data,
      quantity: product?.quantity,
    };
    changeTotal(change);
  };
  const quantityChange = (data) => {
    setQuantity(data);
  };
  return (
    <div className="container border p-2">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-2">
              <img
                src={`${BASE_URL}categories/product_image/image/${cart?.product_image}`}
                className="rounded mx-auto d-block img-thumbnail"
                width="30%"
                alt={`Thumbnail for ${cart?.product_image} cart`}
              />
            </div>
            <div className="col-12 col-sm-12 col-md-10">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-4">
                  <div className="d-flex">
                    <p className="d-md-none">Name:</p>
                    <Link className="ms-2 fw-bold" variant="link">
                      {cart?.name}
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-4">
                  <div className="d-flex">
                    <p className="d-md-none">Price:</p>
                    <p className="ms-2 fw-bold">{cart?.price}</p>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-4">
                  <div className="d-grid">
                    <p className="d-md-none">Quantity:</p>
                    <Quantity
                      quantityValue={product?.quantity}
                      quantityChange={quantityChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div>
            <div className="d-flex justify-content-end gap-2">
              <div className="d-flex">
                <p>SubTotal:</p>
                <p className="ms-2 fw-bold">{totalPrice}</p>
              </div>
              <DeleteCart
                cartData={product?.product?._id}
                productIndex={productIndex}
              />
              <UpdateCart
                quantity={quantity ? quantity : product?.quantity}
                product={product}
                totalChange={totalChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
