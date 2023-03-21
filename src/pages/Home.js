import React, { useEffect, useState } from "react";
import {
  useGetAllProductsQuery,
  useGetWishListQuery,
} from "../feature/profileReducer/authProfile";
import Banner from "../components/design/Banner";
import ProductList from "../components/products/ProductList";
import { useSelector } from "react-redux";
import { getLoginDetails } from "../feature/loginReducer/loginReducer";
import SliderBrand from "../components/design/SliderBrand";

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
    <div>
      <Banner />
      {/* <div className="container">
        <SliderCard />
      </div> */}
      <div className="container">
        <SliderBrand />
      </div>
      <div className="text-center mt-2">
        <p className="fw-600 text-center text-muted font-heading">
          All Products
        </p>
      </div>

      <div className="container p-3">
        <ProductList
          productData={products}
          title="All"
          wishListData={wishList}
        />
      </div>
    </div>
  );
};

export default Home;
