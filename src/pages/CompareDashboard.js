import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductPath from "../components/products/ProductPath";
import { BASE_URL } from "../constants/ConstaltsVariables";
import { getLoginDetails } from "../feature/loginReducer/loginReducer";
import {
  useAddCompareListMutation,
  useGetCompareListQuery,
  useRemoveCompareListMutation,
} from "../feature/profileReducer/authProfile";
import Rating from "@mui/material/Rating";
import { toast } from "react-toastify";
import AlertToast from "../components/common/AlertToast";
import { useNavigate } from "react-router-dom";
import AddCart from "../components/common/AddCart";
import BuyCart from "../components/common/BuyCart";
import { CollectCategories } from "../components/common/CollectCategories";
import { CollectProducts } from "../components/common/CollectProducts";
import { categoriesFilter } from "../components/filter/Alphabetically";

const CompareDashboard = () => {
  const user = useSelector(getLoginDetails);
  const { data: compareData } = useGetCompareListQuery(user?.id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [
    removeCompareList,
    { data: compareListData, isSuccess, isError, error },
  ] = useRemoveCompareListMutation();
  const [
    addCompareList,
    {
      data: addcompareListData,
      isSuccess: compareIsSuccess,
      isError: compareIsError,
      error: compareError,
    },
  ] = useAddCompareListMutation();
  const navigate = useNavigate();
  const [compareList, setCompareList] = useState(compareData?.data?.products);
  useEffect(() => {
    setCompareList(compareData?.data?.products);
  }, [compareData]);
  useEffect(() => {
    if (isSuccess || compareIsSuccess) {
      toast.success(compareListData?.msg || addcompareListData?.msg, {
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
      }, 2001);
    }
    if (isError || compareIsError) {
      toast.error(error?.data?.msg || compareError?.data?.msg, {
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
  }, [
    isSuccess,
    isError,
    error,
    compareListData,
    addcompareListData,
    compareIsSuccess,
    compareIsError,
    compareError,
  ]);
  useEffect(() => {
    if (compareList.length === 0) {
      navigate("/");
    }
  }, [compareList, navigate]);
  const dataList = ["", "", "", ""];
  const subCategories = CollectCategories();
  const products = CollectProducts();
  const init = {
    categorie: "",
    product: "",
  };
  const [selectValues, setSelectValues] = useState(init);
  const [categorieSortProduct, setCategorieSortProduct] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectValues({ ...selectValues, [name]: value });
  };
  useEffect(() => {
    if (selectValues?.categorie) {
      const sortProduct = categoriesFilter(selectValues?.categorie, products);
      setCategorieSortProduct(sortProduct);
    }
    if (selectValues?.product) {
      let patch = {
        user: user.id,
        productId: selectValues?.product,
      };
      addCompareList(patch);
    }
  }, [selectValues, products, user, addCompareList]);
  return (
    <div className="container">
      <div className="home-product">
        <div className="mb-3">
          <ProductPath pathList={["Home", "Product Comparison"]} />
        </div>
        <h5 className=" fw-bold">Product Comparison</h5>
      </div>
      <div className="table-responsive">
        <table className="table  table-vertical table-bordered">
          <tbody>
            <tr className="table-row-height">
              <th></th>
              <td colSpan={dataList?.length} className="text-center fw-bold">
                Product Details
              </td>
            </tr>
            <tr className="table-row-height">
              <th scope="row" className="table-active text-end">
                Name
              </th>
              {dataList?.map((data, index) => {
                if (compareList[index]?.name) {
                } else {
                  return (
                    <td key={index} className="text-center text-muted fw-bold">
                      N/A
                    </td>
                  );
                }
                return (
                  <td key={index} className="text-center text-muted fw-bold">
                    {compareList[index]?.name}
                  </td>
                );
              })}
            </tr>
            <tr className="table-row-height">
              <th scope="row" className="table-active text-end">
                Categories
              </th>
              {dataList?.map((data, index) => {
                if (compareList[index]?.categorie) {
                  return (
                    <td key={index} className="text-center text-muted fw-bold">
                      {compareList[index]?.categorie}
                    </td>
                  );
                } else {
                  return (
                    <td>
                      <select
                        className="form-select"
                        onChange={handleChange}
                        name="categorie"
                      >
                        <option selected>Open this select categories</option>
                        {subCategories?.map((data, index) => {
                          return (
                            <option value={data} key={index}>
                              {data}
                            </option>
                          );
                        })}
                      </select>
                      {categorieSortProduct && (
                        <select
                          className="form-select mt-2"
                          onChange={handleChange}
                          name="product"
                        >
                          {categorieSortProduct?.map((data, index) => {
                            if (index === 0) {
                              return (
                                <>
                                  <option selected key={index}>
                                    Open this select product
                                  </option>
                                  <option value={data._id}>{data.name}</option>
                                </>
                              );
                            } else {
                              return (
                                <option value={data._id} key={index}>
                                  {data.name}
                                </option>
                              );
                            }
                          })}
                        </select>
                      )}
                    </td>
                  );
                }
              })}
            </tr>
            <tr className="table-row-height">
              <th scope="row" className="table-active text-end">
                Image
              </th>
              {dataList?.map((data, index) => {
                if (compareList[index]?.name) {
                  return (
                    <td key={index} className="text-center">
                      <img
                        src={`${BASE_URL}categories/product_image/image/${compareList[index]?.image_name}`}
                        alt={compareList[index]?.product_image}
                        width={100}
                        className="img-thumbnail img-fluid"
                      />
                    </td>
                  );
                } else {
                  return (
                    <td key={index} className="text-center text-muted fw-bold">
                      N/A
                    </td>
                  );
                }
              })}
            </tr>
            <tr className="table-row-height">
              <th scope="row" className="table-active text-end">
                Price
              </th>
              {dataList?.map((data, index) => {
                if (compareList[index]?.name) {
                  return (
                    <td key={index} className="text-center text-muted fw-bold">
                      {compareList[index]?.price}
                    </td>
                  );
                } else {
                  return (
                    <td key={index} className="text-center text-muted fw-bold">
                      N/A
                    </td>
                  );
                }
              })}
            </tr>
            <tr className="table-row-height">
              <th scope="row" className="table-active text-end">
                Strength
              </th>
              {dataList?.map((data, index) => {
                if (compareList[index]?.name) {
                  return (
                    <td key={index} className="text-center text-muted fw-bold">
                      {compareList[index]?.product_strength}
                    </td>
                  );
                } else {
                  return (
                    <td key={index} className="text-center text-muted fw-bold">
                      N/A
                    </td>
                  );
                }
              })}
            </tr>
            <tr className="table-row-height">
              <th scope="row" className="table-active text-end">
                Pack Size
              </th>
              {dataList?.map((data, index) => {
                if (compareList[index]?.name) {
                  return (
                    <td key={index} className="text-center text-muted fw-bold">
                      {compareList[index]?.pack_size}
                    </td>
                  );
                } else {
                  return (
                    <td key={index} className="text-center text-muted fw-bold">
                      N/A
                    </td>
                  );
                }
              })}
            </tr>
            <tr className="table-row-height">
              <th scope="row" className="table-active text-end">
                Rating
              </th>
              {dataList?.map((data, index) => {
                if (compareList[index]?.name) {
                  return (
                    <td key={index} className="text-center text-muted fw-bold">
                      <Rating
                        name="read-only"
                        value={parseInt(compareList[index]?.rating)}
                        readOnly
                        className="text-muted"
                      />
                    </td>
                  );
                } else {
                  return (
                    <td key={index} className="text-center text-muted fw-bold">
                      N/A
                    </td>
                  );
                }
              })}
            </tr>
            <tr className="table-row-height">
              <th scope="row" className="table-active text-end">
                Brand
              </th>
              {dataList?.map((data, index) => {
                if (compareList[index]?.name) {
                  return (
                    <td key={index} className="text-center text-muted fw-bold">
                      {compareList[index]?.brand}
                    </td>
                  );
                } else {
                  return (
                    <td key={index} className="text-center text-muted fw-bold">
                      N/A
                    </td>
                  );
                }
              })}
            </tr>

            <tr className="table-row-height">
              <th scope="row"></th>
              {dataList?.map((data, index) => {
                if (compareList[index]?.name) {
                  return (
                    <td key={index} className="table-active">
                      <div className="d-flex justify-content-between gap-2">
                        <AddCart
                          productId={compareList[index]?.productId?._id}
                        />
                        <BuyCart product={compareList[index]?.productId} />
                      </div>
                    </td>
                  );
                } else {
                  return (
                    <td key={index} className="text-center text-muted fw-bold">
                      N/A
                    </td>
                  );
                }
              })}
            </tr>
            <tr className="table-row-height">
              <th scope="row"></th>
              {dataList?.map((data, index) => {
                if (compareList[index]?.name) {
                  return (
                    <td key={index} className="table-active">
                      <div className="d-grid  gap-2">
                        <button
                          className="btn btn-secondary"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(
                              `/product_details/${compareList[index]?.productId?._id}`
                            );
                          }}
                        >
                          Details
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={(e) => {
                            e.preventDefault();
                            const patch = {
                              user: user?.id,
                              productId: compareList[index]?.productId?._id,
                            };
                            removeCompareList(patch);
                          }}
                        >
                          REMOVE
                        </button>
                      </div>
                    </td>
                  );
                } else {
                  return (
                    <td key={index} className="text-center text-muted fw-bold">
                      N/A
                    </td>
                  );
                }
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <AlertToast />
    </div>
  );
};

export default CompareDashboard;
