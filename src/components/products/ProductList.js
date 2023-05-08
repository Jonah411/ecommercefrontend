import React, { useEffect, useState } from "react";

import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import WishListIcon from "../common/WishListIcon";
import AddCart from "../common/AddCart";
import BuyCart from "../common/BuyCart";

const ProductList = ({
  productData,
  title,
  routeList,
  wishListData,
  listView,
}) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (productData) {
      setProducts(productData);
    }
  }, [productData]);
  const [list, setList] = useState(listView);
  useEffect(() => {
    setList(listView);
  }, [listView]);
  const currentDate = new Date();
  return (
    <div>
      <div className="">
        <p className="fw-bold">{`${title} product list:`}</p>
      </div>

      <div className="row">
        {products?.map((data) => {
          return (
            <div
              className={
                list
                  ? "col-12 col-sm-12 col-md-12 col-lg-12"
                  : "col-12 col-sm-12 col-md-6 col-lg-3"
              }
              key={data._id}
            >
              <div className="mt-2">
                <div className="card">
                  <div className="row">
                    <div
                      className={
                        list
                          ? "col-12 col-sm-12 col-md-5 col-lg-3 "
                          : "col-12 col-sm-12 col-md-12 col-lg-12 "
                      }
                    >
                      <WishListIcon
                        image={data.product_image}
                        productId={data._id}
                        productWishList={data?.wishlist?.wishlist}
                        routeList={routeList}
                        wishListData={wishListData}
                      />
                    </div>
                    <div
                      className={
                        list
                          ? "col-12 col-sm-12 col-md-7 col-lg-9 "
                          : "col-12 col-sm-12 col-md-12 col-lg-12 "
                      }
                    >
                      <div className="container-fluid ">
                        <div className="card-body product_list_body">
                          <div className="">
                            <h5>{data?.name}</h5>
                          </div>
                          <div className="d-flex justify-content-between">
                            {data?.simple_product && data?.sale_price && (
                              <p>
                                Price:{" "}
                                <span className="price fw-bold">
                                  {data?.price}
                                </span>
                              </p>
                            )}

                            {data?.simple_product && (
                              <div className="product-price">
                                {data?.sale_price_start &&
                                  data?.sale_price_end &&
                                  data?.sale_price && (
                                    <p className="m-0">
                                      {currentDate?.getTime() >=
                                        new Date(
                                          data?.sale_price_start
                                        )?.getTime() &&
                                        currentDate?.getTime() <=
                                          new Date(
                                            data?.sale_price_end
                                          )?.getTime() && (
                                          <>
                                            Regular Price:{" "}
                                            <span className="offer-price">
                                              {data?.regular_price}
                                            </span>
                                          </>
                                        )}
                                    </p>
                                  )}
                              </div>
                              // <h6>Price: {data?.price}</h6>
                            )}
                          </div>
                          <div className="d-flex justify-content-end mb-3">
                            <Rating
                              name="read-only"
                              value={parseInt(data?.rating_star?.rating_radio)}
                              readOnly
                            />
                          </div>
                          <hr />
                          <div className="product_list_short_text mb-3">
                            <p className="text-muted">
                              {data?.short_description}...
                            </p>
                          </div>
                        </div>
                        <div className="card-footer">
                          <div className=" ">
                            {data?.simple_product && (
                              <div className="d-flex justify-content-between gap-2">
                                <AddCart productId={data._id} product={data} />
                                <BuyCart product={data} />
                              </div>
                            )}

                            <div className="d-grid gap-2 mt-2">
                              <button
                                className="btn btn-secondary"
                                onClick={() => {
                                  navigate(`/product_details/${data._id}`);
                                }}
                              >
                                <span className="product-font">
                                  PRODUCT DETAILS
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;

// <div
// className="col-12 col-sm-12 col-md-6 col-lg-3"
// key={data._id}
// >
// <Card sx={{ maxWidth: 345 }} className="mt-2">
//   <WishListIcon
//     image={data.product_image}
//     productId={data._id}
//     productWishList={data?.wishlist?.wishlist}
//     routeList={routeList}
//     wishListData={wishListData}
//   />
//   <CardActionArea>

//     <CardContent>
//       <Typography gutterBottom variant="h5" component="div">
//         {data.name}
//       </Typography>
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems="center"
//         spacing={3}
//       >
//         <Typography gutterBottom variant="h6" component="div">
//           Price: {data.price}
//         </Typography>
//         <Rating
//           name="read-only"
//           value={parseInt(data?.rating_star?.rating_radio)}
//           readOnly

//         />
//       </Stack>
//       <Typography variant="body2" color="text.secondary">

//       </Typography>
//     </CardContent>
//   </CardActionArea>

//   <CardActions>
//     <div className="container">
//       <div className="d-flex justify-content-between gap-2">
//         <AddCart productId={data._id} />
//         <BuyCart product={data} />
//       </div>
//       <div className="d-grid gap-2 mt-2">
//         <button
//           className="btn btn-secondary"
//           onClick={() => {
//             navigate(`/product_details/${data._id}`);
//           }}
//         >
//           <span className="product-font">PRODUCT DETAILS</span>
//         </button>
//       </div>
//     </div>
//   </CardActions>
// </Card>
// </div>
