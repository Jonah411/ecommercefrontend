import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import {
  useGetProductsQuery,
  useGetSingleWishListQuery,
} from "../../feature/profileReducer/authProfile";
import Details from "./Details";
import ImageGalleryDetails from "./ImageGallery";
import ProductPath from "./ProductPath";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RatingAndReviewsForm from "./RatingAndReviewsForm";
import ProductDescription from "./ProductDescription";
import SliderRelativeView from "../design/SliderRelativeView";

const ProductDetail = () => {
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
  const [products, setProducts] = useState(productData?.data);
  const [groupGroducts, setGroupProducts] = useState(
    productData?.GroupProductDetails
  );
  useEffect(() => {
    if (productData) {
      setProducts(productData?.data);
      setGroupProducts(productData?.GroupProductDetails);
    }
  }, [productData]);
  const listData = {
    user_id: user?.id,
    product_id: id,
  };
  const { data: wishListDatas } = useGetSingleWishListQuery(listData, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [wishList, setWishList] = useState(wishListDatas?.data);
  useEffect(() => {
    if (wishListDatas) {
      setWishList(wishListDatas?.data);
    }
  }, [wishListDatas]);
  const path = ["Home", "Products", products?.name];
  return (
    <div className="container">
      <div className="p-3 mb-3 mb-3">
        <ProductPath pathList={path} />
      </div>
      <div className="mb-3">
        <div className="row">
          <div className="col-12 col-sm-4">
            <ImageGalleryDetails
              images={products?.product_gallery}
              wishListData={wishList}
              productId={id}
            />
          </div>
          <div className="col-12 col-sm-8">
            <Details details={products} groupGroducts={groupGroducts} />
          </div>
        </div>
      </div>
      <div className="container mt-3 mb-2 ">
        <Tabs
          defaultActiveKey="descriptin"
          id="justify-tab-example"
          className="mb-3 product-feedback"
          justify
        >
          <Tab
            eventKey="descriptin"
            title="Product Description"
            className="product-feedback"
          >
            <ProductDescription details={products} />
          </Tab>
          <Tab
            eventKey="profile"
            title="Ratings & Reviews"
            className="product-feedback"
          >
            <RatingAndReviewsForm details={products} />
          </Tab>
          <Tab
            eventKey="longer-tab"
            title="Questions and Answers"
            className="product-feedback"
            disabled
          >
            john
          </Tab>
          {/* <Tab
            eventKey="contact"
            title="Contact"
            className="product-feedback"
            disabled
          >
            jonah
          </Tab> */}
        </Tabs>
      </div>
      <div className="container mt-3 mb-2 ">
        {products?.related_products && (
          <SliderRelativeView
            relatedViewData={
              products?.related_products && products?.related_products
            }
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
