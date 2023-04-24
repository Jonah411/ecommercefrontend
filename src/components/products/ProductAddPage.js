import React, { useEffect, useState } from "react";
import InitialForm from "./product_types/InitialForm";
import ProductTypes from "./product_types/ProductTypes";
import ImageProduct from "./product_types/ImageProduct";
import CategoriesList from "./product_types/CategoriesList";
import BrandsList from "./product_types/BrandsList";
import { toast } from "react-toastify";
import AlertToast from "../common/AlertToast";
import { useCreateProductDetailsMutation } from "../../feature/profileReducer/authProfile";

const ProductAddPage = () => {
  const [createProductDetails, { data, error, isSuccess, isError }] =
    useCreateProductDetailsMutation();
  const init = {
    name: "",
    email: "",
    description: "",
    short_description: "",
    categorie: "",
    brand: "",
    product_types: "",
    virtual: false,
  };
  const [formValues, setFormValues] = useState(init);
  const [productImage, setProductImage] = useState();
  const [productGallery, setProductGallery] = useState();
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (e.target.type === "file" && name === "product_image") {
      if (e.target.files) {
        let bannerImg = [];
        for (let i = 0; i < e.target.files.length; i++) {
          if (e.target.files[i].size <= 2000000) {
            bannerImg.push(e.target.files[i]);
            setProductImage({ ...productImage, [name]: bannerImg });
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
            setProductGallery({ ...productGallery, [name]: bannerImg });
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
    } else if (name === "virtual") {
      setFormValues({ ...formValues, [name]: checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };
  const simpleinit = {
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
    attributes: "",
    related_products: [],
    like_products: [],
  };

  const [simpleProductValues, setSimpleProductValues] = useState(simpleinit);
  const [simpleIsSubmit, setSimpleIsSubmit] = useState(false);
  const [simpleError, setSimpleError] = useState();
  const handleSimpleProductChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "quantity_status") {
      if (value === "sold_individually") {
        setSimpleProductValues({ ...simpleProductValues, [name]: value });
      }
    }
    if (name === "manage_stock" || name === "sold_individually") {
      setSimpleProductValues({ ...simpleProductValues, [name]: checked });
    } else {
      setSimpleProductValues({ ...simpleProductValues, [name]: value });
    }
  };
  const groupinit = {
    sku: "",
    group_products: [],
    related_products: [],
    like_products: [],
  };
  const [groupProductValues, setGroupProductValues] = useState(groupinit);
  const handleGroupProductChange = (e) => {
    const { name, value } = e.target;
    setGroupProductValues({ ...groupProductValues, [name]: value });
  };
  const [productValues, setProductValues] = useState({
    ...formValues,
    ...simpleProductValues,
    ...groupProductValues,
  });
  useEffect(() => {
    setProductValues({
      ...formValues,
      ...simpleProductValues,
      ...groupProductValues,
    });
  }, [formValues, simpleProductValues, groupProductValues]);
  const handlePublish = (e) => {
    e.preventDefault();
    setSimpleIsSubmit(true);
    setSimpleError(simpleValidation(formValues, productImage, productGallery));
  };
  const simpleValidation = (value, productImage) => {
    const error = {};
    if (!value?.name) {
      error.name = "Name field is required!";
    }
    if (!value?.description) {
      error.description = "Description field is required!";
    }
    if (!value?.short_description) {
      error.short_description = "Short Description field is required!";
    }
    if (!value?.brand) {
      error.brand = "Choose your brand!";
    }
    if (!value?.categorie) {
      error.categorie = "Choose your Categorie!";
    }
    if (!value?.product_types) {
      error.product_types = "Select your product types";
    }
    if (!productImage) {
      error.product_image = "Select your Product Image";
    }
    if (!productGallery) {
      error.product_gallery = "Select your Product Gallery Images";
    }
    return error;
  };
  useEffect(() => {
    const onFieldChange = () => {
      const formData = new FormData();
      formData.append("json_data", JSON.stringify(productValues));
      formData.append(
        "product_image",
        productImage?.product_image && productImage?.product_image[0]
      );
      if (productGallery) {
        Array.from(
          productGallery?.product_gallery && productGallery?.product_gallery
        ).forEach((item) => {
          formData.append("product_gallery", item);
        });
      }
      createProductDetails(formData);
    };
    if (
      Object.keys(simpleError ? simpleError : []).length === 0 &&
      simpleIsSubmit
    ) {
      onFieldChange();
    }
  }, [
    simpleError,
    simpleIsSubmit,
    productValues,
    productImage,
    productGallery,
    createProductDetails,
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
      setSimpleIsSubmit(false);
      setTimeout(() => {
        // setIsSubmit(false);
        // navigate("/profile/product");
      }, 2001);
    }
    if (isError) {
      setSimpleIsSubmit(false);
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
  }, [isSuccess, isError, data, error]);
  // Get today's date
  const today = new Date();

  // Get the day, month, and year components from the date object
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  // Format the date in "dd-mm-yyyy" format
  const formattedDate = `${day}-${month}-${year}`;
  return (
    <div className="container">
      <div className="mb-3">
        <h4 className="font-heading">Add Product</h4>
      </div>
      {simpleError && Object.keys(simpleError).length !== 0 && (
        <div className="mt-2 mb-3">
          <div className="danger-alert-ecommerce">
            <p className="m-0">
              <span className="code-checkout-error">{simpleError?.name}</span>
            </p>
            <p className="m-0">
              <span className="code-checkout-error">
                {simpleError?.description}
              </span>
            </p>
            <p className="m-0">
              <span className="code-checkout-error">
                {simpleError?.short_description}
              </span>
            </p>
            <p className="m-0">
              <span className="code-checkout-error">{simpleError?.brand}</span>
            </p>
            <p className="m-0">
              <span className="code-checkout-error">
                {simpleError?.categorie}
              </span>
            </p>
            <p className="m-0">
              <span className="code-checkout-error">
                {simpleError?.product_types}
              </span>
            </p>
            <p className="m-0">
              <span className="code-checkout-error">
                {simpleError?.product_image}
              </span>
            </p>
            <p className="m-0">
              <span className="code-checkout-error">
                {simpleError?.product_gallery}
              </span>
            </p>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-12 col-12 col-md-8 col-lg-9">
          <div className="card mb-3">
            <div className="card-body">
              <InitialForm
                handleChange={handleChange}
                formValues={formValues}
              />
            </div>
          </div>
          <ProductTypes
            handleChange={handleChange}
            selectedOption={formValues?.product_types}
            handleSimpleProductChange={handleSimpleProductChange}
            simpleProductValues={simpleProductValues}
            handleGroupProductChange={handleGroupProductChange}
            groupProductValues={groupProductValues}
            formValues={formValues}
          />
          <div className="card mb-3">
            <div className="card-body">
              <div className="container">
                <div className="mb-3">
                  <label className="form-label">Short Discription</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    name="short_description"
                    onChange={handleChange}
                    maxLength="150"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-12 col-md-4 col-lg-3">
          <div className="card mb-3">
            <div className="card-header">
              <p>Publish</p>
            </div>
            <div className="card-body">
              <p>Published on : {formattedDate}</p>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-primary"
                  onClick={(e) => handlePublish(e)}
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
          <ImageProduct
            handleChange={handleChange}
            selectedFile={productImage?.product_image}
            selectedGalleryFile={productGallery?.product_gallery}
          />
          <CategoriesList
            handleChange={handleChange}
            selectedCategorie={formValues?.categorie}
          />
          <BrandsList
            handleChange={handleChange}
            selectedBrand={formValues?.brand}
          />
        </div>
      </div>
      <AlertToast />
    </div>
  );
};

export default ProductAddPage;
