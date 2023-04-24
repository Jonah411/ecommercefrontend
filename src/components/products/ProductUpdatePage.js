import React, { useEffect, useState } from "react";
import InitialForm from "./product_types/InitialForm";
import ProductTypes from "./product_types/ProductTypes";
import ImageProduct from "./product_types/ImageProduct";
import CategoriesList from "./product_types/CategoriesList";
import BrandsList from "./product_types/BrandsList";
import { toast } from "react-toastify";
import AlertToast from "../common/AlertToast";
import { useSelector } from "react-redux";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductsQuery,
  useUpdateProductDetailsMutation,
} from "../../feature/profileReducer/authProfile";
import DropProductDetails from "./DropProductDetails";

const ProductUpdatePage = () => {
  const [updateProductDetails, { data, error, isSuccess, isError }] =
    useUpdateProductDetailsMutation();
  const user = useSelector(getLoginDetails);
  let { id } = useParams();
  let list = {
    id: id,
    type: "product",
    user: user && user?.id,
  };

  const { data: productData } = useGetProductsQuery(list, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const navigate = useNavigate();
  const [products, setProducts] = useState(productData && productData?.data);
  // const [groupGroducts, setGroupProducts] = useState(
  //   productData?.GroupProductDetails
  // );
  useEffect(() => {
    if (productData) {
      setProducts(productData && productData?.data);
      // setGroupProducts(productData?.GroupProductDetails);
    }
  }, [productData]);
  const init = {
    productId: products ? products && products?._id : "",
    name: products ? products && products?.name : "",
    email: products ? products && products?.email : "",
    description: products ? products && products?.description : "",
    short_description: products ? products && products?.short_description : "",
    categorie: products ? products && products?.categorie?._id : "",
    brand: products ? products && products?.brand?._id : "",
    product_types: products ? products && products?.productType : "",
  };
  const [formValues, setFormValues] = useState(init);
  const [productImage, setProductImage] = useState();
  const [productGallery, setProductGallery] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
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
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };
  const simpleinit = {
    regular_price: products ? products && products?.regular_price : "",
    sale_price: products ? products && products?.sale_price : "",
    sale_price_start: products ? products && products?.sale_price_start : "",
    sale_price_end: products ? products && products?.sale_price_end : "",
    strength: products ? products && products?.simple_product?.strength : "",
    pack_size: products ? products && products?.simple_product?.pack_size : "",
    sku: products ? products && products?.simple_product?.sku : "",
    stock_status: products
      ? products && products?.simple_product?.stock_status
      : "",
    manage_stock: products ? products?.simple_product?.manage_stock : false,
    stock_quantity: products
      ? products && products?.simple_product?.stock_quantity
      : "",
    backorders_status: products
      ? products && products?.simple_product?.backorders_status
      : "",
    stock_threshold: products
      ? products && products?.simple_product?.stock_threshold
      : "",
    sold_individually: products
      ? products && products?.simple_product?.sold_individually
      : false,
    quantity_status: products
      ? products && products?.simple_product?.quantity_status
      : "",
    min_stock_quantity: products
      ? products && products?.simple_product?.min_stock_quantity
      : "",
    related_products: products
      ? products && products?.simple_product?.related_products
      : [],
    like_products: products
      ? products && products?.simple_product?.like_products
      : [],
    attributes: products
      ? products && products?.simple_product?.attributes
      : [],
    simpleId: products ? products && products?.simple_product?._id : [],
  };
  const [simpleProductValues, setSimpleProductValues] = useState(simpleinit);
  const [simpleIsSubmit, setSimpleIsSubmit] = useState(false);
  const [simpleError, setSimpleError] = useState();
  const handleSimpleProductChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "manage_stock" || name === "sold_individually") {
      setSimpleProductValues({ ...simpleProductValues, [name]: checked });
    } else {
      setSimpleProductValues({ ...simpleProductValues, [name]: value });
    }
  };
  const groupinit = {
    sku: products ? products && products?.group_product?.sku : "",
    group_products: products
      ? products && products?.group_product?.group_products
      : [],
    related_products: products
      ? products && products?.group_product?.related_products
      : [],
    like_products: products
      ? products && products?.group_product?.like_products
      : [],
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
  const handleUpdate = (e) => {
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
    // if (!productImage) {
    //   error.product_image = "Select your Product Image";
    // }
    // if (!productGallery) {
    //   error.product_gallery = "Select your Product Gallery Images";
    // }
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
      updateProductDetails(formData);
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
    updateProductDetails,
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
        navigate("/profile/product");
      }, 3000);
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
  }, [isSuccess, isError, data, error, navigate]);

  const dateFilter = (valueData) => {
    const date = new Date(valueData);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formattedDate = dateFilter(products?.date);
  const updatedDate = dateFilter(products?.update_date);
  return (
    <div className="container">
      <div className="mb-3">
        <h4 className="font-heading">Update Product</h4>
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
            {/* <p className="m-0">
              <span className="code-checkout-error">
                {simpleError?.product_image}
              </span>
            </p>
            <p className="m-0">
              <span className="code-checkout-error">
                {simpleError?.product_gallery}
              </span>
            </p> */}
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
                    value={formValues?.short_description}
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
              <p className="m-0">Published on : {formattedDate}</p>
            </div>
            <div className="card-body">
              <p>Updated on : {updatedDate}</p>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-between">
                <DropProductDetails productId={id} />
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleUpdate(e)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <ImageProduct
            handleChange={handleChange}
            selectedFile={productImage?.product_image}
            selectedGalleryFile={productGallery?.product_gallery}
            productsImage={products}
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

export default ProductUpdatePage;
