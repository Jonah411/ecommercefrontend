import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import AddCart from "../common/AddCart";
import BuyCart from "../common/BuyCart";
import Quantity from "../cart/Quantity";
import { BASE_URL } from "../../constants/ConstaltsVariables";

const Details = ({ details, groupGroducts }) => {
  const [productDetails, setProductDetails] = useState();
  useEffect(() => {
    setProductDetails(details);
  }, [details]);
  const [cart, setCart] = useState();
  useEffect(() => {
    if (groupGroducts) {
      let datacart = [];
      for (let i = 0; i < groupGroducts.length; i++) {
        datacart.push({ quantity: 1 });
      }
      setCart(datacart);
    }
  }, [groupGroducts]);
  const handleQuantityChange = (newQuantity, index) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[index] = {
        ...newCart[index],
        quantity: newQuantity,
      };
      return newCart;
    });
  };
  const minStockQuantity = productDetails?.simple_product?.min_stock_quantity;
  const [quantity, setQuantity] = useState(
    minStockQuantity ? minStockQuantity : 1
  );
  useEffect(() => {
    setQuantity(minStockQuantity ? minStockQuantity : 1);
  }, [minStockQuantity]);
  const handleStockQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };
  return (
    <div className="image-app p-2">
      <div className="card">
        <div className="card-body">
          <div className="product-details">
            <div className="product-tiltle">
              <h5 className="text-muted"> {productDetails?.name}</h5>
            </div>
            <div className="d-flex justify-content-between">
              <div className="product-price">
                {productDetails?.simple_product?.sale_price ? (
                  <p className="m-0">
                    Price:{" "}
                    <span className="offer-price">{productDetails?.price}</span>
                  </p>
                ) : (
                  <p>
                    Price:{" "}
                    <span className="price">{productDetails?.price}</span>
                  </p>
                )}
                {productDetails?.simple_product?.sale_price && (
                  <p>
                    Sale Price:{" "}
                    <span className="price">
                      {productDetails?.simple_product?.sale_price}
                    </span>
                  </p>
                )}
              </div>
              <Rating
                name="read-only"
                value={parseInt(productDetails?.rating_star?.rating_radio)}
                readOnly
                // onChange={(event, newValue) => {
                //   setValue(newValue);
                // }}
              />
            </div>
            {productDetails?.simple_product && (
              <div className="product-field card">
                <div className="d-flex justify-content-between">
                  <div className="product-price">
                    <p> Strength: </p>
                  </div>
                  <div className="">
                    {productDetails?.simple_product?.strength}
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="product-price">
                    <p> Pack Size: </p>
                  </div>
                  <div className="">
                    {productDetails?.simple_product?.pack_size}
                  </div>
                </div>
                {productDetails?.simple_product?.manage_stock ? (
                  <div>
                    {productDetails?.simple_product?.stock_quantity ? (
                      <div>
                        <div className="d-flex justify-content-between">
                          <div className="product-price">
                            <p> Stock Quantity: </p>
                          </div>
                          <div className="">
                            {productDetails?.simple_product?.stock_quantity}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div className="product-price">
                            <p className="m-0"> Quantity: </p>
                            {productDetails?.simple_product?.quantity_status ===
                              "sold_individually" && (
                              <p className="fs-6">
                                Limit purchases to 1 item per order
                              </p>
                            )}
                          </div>
                          <div className="">
                            <Quantity
                              onQuantityChange={(newQuantity) =>
                                handleStockQuantityChange(newQuantity)
                              }
                              quantityValue={1}
                              soldIndividually={
                                productDetails?.simple_product
                                  ?.quantity_status === "sold_individually"
                                  ? true
                                  : false
                              }
                              maxValue={
                                productDetails?.simple_product
                                  ?.backorders_status === "Do Not Allow" &&
                                productDetails?.simple_product?.stock_quantity
                              }
                              minValue={
                                productDetails?.simple_product
                                  ?.min_stock_quantity
                              }
                              backordersstatus={
                                productDetails?.simple_product
                                  ?.backorders_status
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-between">
                        <div className="product-price">
                          <p> Stock Quantity: </p>
                        </div>
                        <div className="text-danger">Out of Stock</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="d-flex justify-content-between">
                      <div className="product-price">
                        <p> Pack Stock: </p>
                      </div>
                      <div
                        className={
                          productDetails?.simple_product?.stock_status ===
                          "Out of stock"
                            ? "text-danger"
                            : ""
                        }
                      >
                        {productDetails?.simple_product?.stock_status}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {productDetails?.group_product && (
              <div className=" p-2">
                <div className="table-responsive">
                  <table className="table table-design">
                    <thead className="table-secondary  ">
                      <tr className="p-4">
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
                        <th scope="col" className="p-4">
                          #
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupGroducts?.map((data, index) => {
                        return (
                          <tr className="table-parent" key={data?._id}>
                            <td className="table-light p-4 table-child">
                              <img
                                src={`${BASE_URL}categories/product_image/image/${data?.product_image}`}
                                className="rounded"
                                alt="..."
                                width={100}
                              />
                            </td>
                            <td className="table-light p-4 table-child">
                              {data?.name}
                            </td>
                            <td className="table-light p-4 table-child">
                              {data?.price}
                            </td>
                            <td className="table-light p-4 table-child">
                              <Quantity
                                index={index}
                                onQuantityChange={(newQuantity) =>
                                  handleQuantityChange(newQuantity, index)
                                }
                                quantityValue={cart[index]?.quantity}
                                maxValue={data?.simple_product?.stock_quantity}
                              />
                            </td>
                            <td className="table-light p-4 table-child">
                              {(data?.price * cart[index]?.quantity).toFixed(1)}
                            </td>
                            <td className="d-grid gap-2">
                              <AddCart
                                productId={data?._id}
                                productQuandity={cart[index]?.quantity}
                                productStockQuantity={quantity && quantity}
                              />
                              <BuyCart product={data} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <div className="product-field">
              <div className="d-flex justify-content-between">
                <div className="product-price">
                  <p> Categories: </p>
                </div>
                <div className="">
                  {productDetails?.categorie?.parent_categories?.name}
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="product-price">
                  <p>Sub Categories: </p>
                </div>
                <div className=""> {productDetails?.categorie?.name}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="product-price">
                  <p>Brand:</p>
                </div>
                <div className="">{productDetails?.brand?.name}</div>
              </div>
            </div>
          </div>
        </div>
        {productDetails?.group_product ? (
          ""
        ) : (
          <div className="card-footer">
            {productDetails?.simple_product?.manage_stock ? (
              <div>
                {productDetails?.simple_product?.stock_quantity ? (
                  <div className="d-grid gap-2">
                    <AddCart
                      productId={productDetails?._id}
                      productStockQuantity={quantity && quantity}
                    />
                    <BuyCart product={productDetails} />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div>
                {productDetails?.simple_product?.stock_status === "In Stock" ? (
                  <div className="d-grid gap-2">
                    <AddCart
                      productId={productDetails?._id}
                      productStockQuantity={quantity && quantity}
                    />
                    <BuyCart product={productDetails} />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
