import React, { useCallback, useEffect, useState } from "react";
import TooltipMsg from "../../design/TooltipMsg";
import VariantsDetail from "./VariantsDetail";
import { toast } from "react-toastify";
import { useCreateVariantsMutation } from "../../../feature/profileReducer/authProfile";

const Variants = ({ ProductValues, handleChange }) => {
  const [createVariants, { data, error, isSuccess, isError }] =
    useCreateVariantsMutation();
  const [variantState, setVariantState] = useState({
    variationFunction: "Add Variation",
  });
  const [variantValue, setVariantValue] = useState(ProductValues?.attributes);
  const [defaultFormShow, setDefaultFormShow] = useState(false);
  // const [variantId, setVariantId] = useState([]);

  const instVariant = {
    name: "",
    email: "",
    description: "",
    regular_price: "",
    sale_price: "",
    sale_price_start: "",
    sale_price_end: "",
    strength: "",
    pack_size: "",
    sku: "",
    stock_status: "In Stock",
    stock_quantity: "",
    backorders_status: "",
    stock_threshold: "",
    manage_stock: false,
    quantity_status: "",
    min_stock_quantity: "",
    sold_individually: false,
    default_value_variant: "",
  };

  const [productImage, setProductImage] = useState([]);
  const [productGallery, setProductGallery] = useState([]);
  const [variantsIsSubmit, setVariantsIsSubmit] = useState(false);
  const handleVariantChange = (e, index) => {
    const { name, value } = e.target;
    if (e.target.type === "file" && name === "product_image") {
      if (e.target.files) {
        let bannerImg = [];
        for (let i = 0; i < e.target.files.length; i++) {
          if (e.target.files[i].size <= 2000000) {
            bannerImg.push(e.target.files[i]);
            const newData = [...productImage];
            newData[index] = { ...newData[index], [name]: bannerImg };
            setProductImage(newData);
            // setProductImage({ ...productImage, [name]: bannerImg });
          } else {
            toast.error("Image size Big", {
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
      }
    } else if (e.target.type === "file" && name === "product_gallery") {
      if (e.target.files) {
        let bannerImg = [];
        for (let i = 0; i < e.target.files.length; i++) {
          if (e.target.files[i].size <= 2000000) {
            bannerImg.push(e.target.files[i]);
            const newData = [...productGallery];
            newData[index] = { ...newData[index], [name]: bannerImg };
            setProductGallery(newData);
            //  setProductGallery({ ...productGallery, [name]: bannerImg });
          } else {
            toast.error("Image size Big", {
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
      }
    } else {
      const newData = [...myArray];
      newData[index] = { ...newData[index], [name]: value };
      setMyArray(newData);
    }
  };

  useEffect(() => {
    setVariantValue(ProductValues?.attributes);
  }, [ProductValues]);

  const handleStateChange = (e) => {
    const { name, value } = e.target;
    setVariantState({ ...variantState, [name]: value });
  };
  const [myArray, setMyArray] = useState([]);
  const handleCreate = (e) => {
    e.preventDefault();
    if (variantState?.variationFunction === "Add Variation") {
      setDefaultFormShow(true);
      setProductImage([...productImage, { product_image: [] }]);
      setProductGallery([...productGallery, { product_gallery: [] }]);
      setMyArray([...myArray, instVariant]);
    }
  };
  const handleVariantClick = (e) => {
    e.preventDefault();
    setVariantsIsSubmit(true);
  };
  const createVariantsData = useCallback(
    (formData) => {
      createVariants(formData);
    },
    [createVariants]
  );
  useEffect(() => {
    if (myArray && myArray.length !== 0 && variantsIsSubmit) {
      myArray.forEach((element, index) => {
        const formData = new FormData();
        formData.append("json_data", JSON.stringify(element));
        formData.append(
          "product_image",
          productImage[index]?.product_image &&
            productImage[index]?.product_image[0]
        );

        const productGalleryArray = productGallery[index]?.product_gallery;
        if (productGalleryArray && productGalleryArray.length > 0) {
          productGalleryArray.forEach((item) => {
            formData.append("product_gallery", item);
          });
        }

        variantsIsSubmit && createVariantsData(formData);
      });
    }
  }, [
    variantsIsSubmit,
    myArray,
    productImage,
    productGallery,
    createVariantsData,
  ]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setVariantsIsSubmit(false);
      // setVariantId((prevVariantId) => [...prevVariantId, data?.data]);

      //variantId.push(data?.data);
      setTimeout(() => {
        // setIsSubmit(false);
        // navigate("/profile/product");
      }, 2001);
    }
    if (isError) {
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
      setVariantsIsSubmit(false);
    }
  }, [isSuccess, isError, data, error]);
  useEffect(() => {
    if (data?.data && variantsIsSubmit) {
      const dataId = {
        target: {
          name: "variantId",
          value: data?.data,
        },
      };
      handleChange(dataId);
    }
  }, [data?.data, variantsIsSubmit, handleChange]);
  const [defaultVariantValues, setDefaultVariantValues] = useState([
    { default_variant_status: "" },
  ]);
  const handleVariantValueChange = (e, index) => {
    const { name, value } = e.target;
    const newList = [...defaultVariantValues];
    newList[index] = { ...newList[index], [name]: value };
    setDefaultVariantValues(newList);
  };
  useEffect(() => {
    if (defaultVariantValues) {
      const dataId = {
        target: {
          name: "defaultform",
          value: defaultVariantValues,
        },
      };
      dataId && handleChange(dataId);
    }
  }, [defaultVariantValues, handleChange]);
  return (
    <div>
      <div className="container">
        {defaultFormShow && (
          <div className="mb-3">
            <div className="d-flex gap-2 mb-2">
              <label className="form-label text-muted">
                Default Form Values
              </label>
              <TooltipMsg
                text={
                  "Choose a default form values if you want a certain variation already when a selector visit a product page."
                }
              />
            </div>
            <div className="d-flex gap-2">
              {variantValue ? (
                variantValue?.map((variableproduct, index) => {
                  if (variableproduct?.variations) {
                    return (
                      <select
                        className="form-select"
                        value={defaultVariantValues?.default_variant_status}
                        name="default_variant_status"
                        onChange={(e) => handleVariantValueChange(e, index)}
                        key={index}
                      >
                        {variableproduct?.attr_values?.map((data, index) => {
                          if (index === 0) {
                            return (
                              <>
                                <option value="default">
                                  No defaultssss {variableproduct?.attr_name}
                                </option>
                                <option value={`${data}`} key={index}>
                                  {data}
                                </option>
                              </>
                            );
                          } else {
                            return (
                              <option value={`${data}`} key={index}>
                                {data}
                              </option>
                            );
                          }
                        })}
                      </select>
                    );
                  } else {
                    return <div key={index}>Add Atributes</div>;
                  }
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
        <div className="mb-3">
          <div className="d-flex gap-2">
            <select
              className="form-select"
              value={variantState?.variationFunction}
              name="variationFunction"
              onChange={handleStateChange}
            >
              <option value="Add Variation">Add Variation</option>
              <option value="default">Delete All Variations</option>
            </select>
            <button
              className="btn btn-outline-secondary"
              onClick={(e) => handleCreate(e)}
            >
              Go
            </button>
          </div>
        </div>
        <div className="mb-3">
          {myArray?.map((data, index) => {
            return (
              <VariantsDetail
                variantValue={variantValue}
                variantFormValues={myArray}
                variantIndex={index}
                handleVariantChange={(e) => handleVariantChange(e, index)}
                productImage={productImage}
                productGallery={productGallery}
                variantData={data}
              />
            );
          })}
        </div>
        <hr />
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onClick={(e) => handleVariantClick(e)}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Variants;
