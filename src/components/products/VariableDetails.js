import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import {
  useGetVariantsDetailsQuery,
  useGetVariantsProductQuery,
  useUpdateProductVariantsMutation,
} from "../../feature/profileReducer/authProfile";
import { toast } from "react-toastify";
import Quantity from "../cart/Quantity";
import AddCart from "../common/AddCart";
import BuyCart from "../common/BuyCart";

const VariableDetails = ({
  VariableProduct,
  VariantproductDetails,
  handleStockQuantityChange,
  quantity,
  handleChangeProductDetails,
}) => {
  const { data: variantsData } = useGetVariantsDetailsQuery(VariableProduct, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [
    updateProductVariants,
    {
      data: updateProductDetails,
      isLoading: updateIsLoading,
      error,
      isSuccess: updateSuccess,
      isError,
    },
  ] = useUpdateProductVariantsMutation();
  const [attributes, setAttributes] = useState(variantsData?.attributes);
  const [defaultValueVariant, setDefaultValueVariant] = useState([]);
  const [variantsId, setVariantsId] = useState([]);
  const [productDetails, setProductDetails] = useState(
    updateProductDetails?.data
  );
  useEffect(() => {
    setProductDetails(updateProductDetails?.data);
  }, [updateProductDetails]);
  useEffect(() => {
    if (variantsData?.attributes !== 0) {
      setAttributes(variantsData?.attributes);
      setDefaultValueVariant(
        variantsData?.attributes.map(() => ({ default_value_variant: "" }))
      );
    }
    if (variantsData?.variantId.length !== 0) {
      setVariantsId(variantsData?.variantId.map(({ _id }) => _id));
    }
  }, [variantsData]);
  const { data: variantsDetailsData } = useGetVariantsProductQuery(variantsId, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [variantIsSubmit, setVariantIsSubmit] = useState(false);
  const [variantError, setVariantError] = useState([]);
  const handleValueVariantChange = (e, index) => {
    const { name, value } = e.target;
    const newList = [...defaultValueVariant];
    newList[index] = { ...newList[index], [name]: value };
    setDefaultValueVariant(newList);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setVariantIsSubmit(true);
    setVariantError(validation(defaultValueVariant, attributes));
  };
  const validation = (values, attributes) => {
    if (
      !values ||
      !Array.isArray(values) ||
      !attributes ||
      !Array.isArray(attributes)
    ) {
      throw new Error("Invalid arguments");
    }

    const errors = [];

    values.forEach((variant, index) => {
      if (!variant.default_value_variant) {
        errors[
          index
        ] = `Select Variants is required for ${attributes[index].attr_name}`;
      }
    });

    return errors;
  };
  useEffect(() => {
    if (variantError.length === 0 && variantIsSubmit) {
      let match = null;

      const variantsWithoutId = variantsDetailsData.map((variant) => {
        const defaultvariant = variant.defaultvariant.map(
          ({ _id, ...rest }) => rest
        );
        return { defaultvariant };
      });

      for (let i = 0; i < variantsWithoutId.length; i++) {
        if (
          JSON.stringify(variantsWithoutId[i].defaultvariant) ===
          JSON.stringify(defaultValueVariant)
        ) {
          match = variantsDetailsData[i];
          break;
        }
      }

      if (match) {
        const patch = {
          id: VariantproductDetails?._id,
          VariableProduct_id: VariableProduct,
          description: match?.description,
          regular_price: match?.regular_price,
          sale_price: match?.sale_price,
          sale_price_start: match?.sale_price_start,
          sale_price_end: match?.sale_price_end,
          product_gallery: match?.product_gallery,
          strength: match?.strength,
          pack_size: match?.pack_size,
          min_stock_quantity: match?.min_stock_quantity,
          manage_stock: match?.manage_stock,
          quantity_status: match?.quantity_status,
          sku: match?.sku,
          stock_quantity: match?.stock_quantity,
          stock_status: match?.stock_status,
          stock_threshold: match?.stock_threshold,
        };
        updateProductVariants(patch);
      } else {
        toast.error("The two arrays do not match.", {
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
    } else {
      variantError &&
        variantError?.map((data) =>
          toast.error(data && data, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        );
    }
  }, [
    variantError,
    VariableProduct,
    VariantproductDetails?._id,
    defaultValueVariant,
    variantIsSubmit,
    variantsDetailsData,
    updateProductVariants,
  ]);
  useEffect(() => {
    if (updateSuccess) {
      toast.success(updateProductDetails?.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setVariantIsSubmit(false);
      updateProductDetails?.data &&
        handleChangeProductDetails(updateProductDetails?.data);
      setTimeout(() => {
        //  window.location.reload();
      }, 2001);
    }
    if (isError) {
      setVariantIsSubmit(false);
      toast.error(error?.data?.msg, {
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
    updateSuccess,
    isError,
    updateProductDetails,
    error,
    handleChangeProductDetails,
  ]);
  return (
    <div>
      {attributes?.map((attribute, index) => {
        if (attribute) {
          return (
            <div key={index}>
              <label>{attribute?.attr_name}</label>
              <div className="d-flex justify-content-between" key={index}>
                <select
                  className="form-select mb-2"
                  //   value={productValues.backorders_status}
                  name="default_value_variant"
                  onChange={(e) => handleValueVariantChange(e, index)}
                >
                  <option value="default">
                    No default {attribute?.attr_name}
                  </option>
                  {attribute?.attr_values?.map((data, index) => {
                    return (
                      <option value={data} key={index}>
                        {data}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          );
        }
        return null;
      })}
      <div className="d-grid">
        <button className="btn btn-secondary" onClick={(e) => handleClick(e)}>
          {updateIsLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            "Get Product"
          )}
        </button>
      </div>
      {updateSuccess && (
        <>
          <div className="product-field card mt-3">
            <div className="d-flex justify-content-between">
              <div className="product-price">
                <p> Strength: </p>
              </div>
              <div className="">
                {productDetails?.variable_product?.strength}
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="product-price">
                <p> Pack Size: </p>
              </div>
              <div className="">
                {productDetails?.variable_product?.pack_size}
              </div>
            </div>
            {productDetails?.variable_product?.manage_stock ? (
              <div>
                {productDetails?.variable_product?.stock_quantity ? (
                  <div>
                    <div className="d-flex justify-content-between">
                      <div className="product-price">
                        <p> Stock Quantity: </p>
                      </div>
                      <div className="">
                        {productDetails?.variable_product?.stock_quantity}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="product-price">
                        <p className="m-0"> Quantity: </p>
                        {productDetails?.variable_product?.quantity_status ===
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
                            productDetails?.variable_product
                              ?.quantity_status === "sold_individually"
                              ? true
                              : false
                          }
                          maxValue={
                            productDetails?.variable_product
                              ?.backorders_status === "Do Not Allow" &&
                            productDetails?.variable_product?.stock_quantity
                          }
                          minValue={
                            productDetails?.variable_product?.min_stock_quantity
                          }
                          backordersstatus={
                            productDetails?.variable_product?.backorders_status
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
                      productDetails?.variable_product?.stock_status ===
                      "Out of stock"
                        ? "text-danger"
                        : ""
                    }
                  >
                    {productDetails?.variable_product?.stock_status}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-3 mb-3 d-grid gap-2">
            <AddCart
              productId={productDetails?._id}
              productStockQuantity={quantity && quantity}
            />
            <BuyCart product={productDetails} />
          </div>
        </>
      )}
    </div>
  );
};

export default VariableDetails;
