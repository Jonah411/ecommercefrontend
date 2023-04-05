import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import {
  useGetRecentViewProductsQuery,
  useGetWishListQuery,
} from "../../feature/profileReducer/authProfile";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductDesign from "../products/ProductDesign";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const SliderRecentView = () => {
  const user = useSelector(getLoginDetails);
  const { data: recentViewData } = useGetRecentViewProductsQuery(user?.id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
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
  const [recentView, setRecentView] = useState([]);
  useEffect(() => {
    if (recentViewData) {
      setRecentView(recentViewData?.data?.products);
    }
  }, [recentViewData]);
  return (
    <div className="mt-3 mb-3">
      <div className="home-section">
        <p className=" font-heading">Recent View</p>
      </div>

      <div className="container">
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {recentView &&
            recentView?.map((item, index) => (
              <ProductDesign
                productData={item}
                title="All"
                wishListData={wishList}
                listView={false}
                key={index}
              />
            ))}
        </Carousel>
      </div>
    </div>
  );
};

export default SliderRecentView;
