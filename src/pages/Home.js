import React, { useEffect, useState } from "react";
import {
  useGetAllProductsQuery,
  useGetWishListQuery,
} from "../feature/profileReducer/authProfile";
import ProductList from "../components/products/ProductList";
import { useSelector } from "react-redux";
import { getLoginDetails } from "../feature/loginReducer/loginReducer";
import SliderBrand from "../components/design/SliderBrand";
import BannerDesign from "../components/design/BannerDesign";

const Home = () => {
  const user = useSelector(getLoginDetails);
  const { data: productData } = useGetAllProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (productData) {
      setProducts(productData?.data);
    }
  }, [productData]);
  const { data: wishListDatas } = useGetWishListQuery(user?.id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [wishList, setWishList] = useState(wishListDatas?.data);
  useEffect(() => {
    if (wishListDatas) {
      setWishList(wishListDatas?.data);
    }
  }, [wishListDatas]);
  return (
    <div className=" mb-3">
      <div className="bg-primary home-banner">
        <div className="home-banner-design">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-4">
              <div className="home-banner-design-text">
                <h1>MERN - ECOMMERCE</h1>
                <h2>Secure your, and your family’s health today!</h2>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-8">
              <BannerDesign />
            </div>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="wave-banner"
        >
          <path
            fill="#e7e6e6"
            fill-opacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      {/* <div className="container">
        <SliderCard />
      </div> */}
      <div className="container mt-3 mb-3">
        <SliderBrand />
      </div>
      <div className="container mt-3 mb-3">
        <div className="home-section">
          <p className="font-heading">All Products</p>
        </div>

        <div className="container">
          <ProductList
            productData={products}
            title="All"
            wishListData={wishList}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
