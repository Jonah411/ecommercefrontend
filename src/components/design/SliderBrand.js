import React, { useEffect, useState } from "react";
import { useGetAllBrandsQuery } from "../../feature/profileReducer/authProfile";
import ReactCardSlider from "react-card-slider-component";
import { BASE_URL } from "../../constants/ConstaltsVariables";
import { useNavigate } from "react-router-dom";

const SliderBrand = () => {
  const { data: brandData } = useGetAllBrandsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    if (brandData) {
      setBrands(brandData?.data);
    }
  }, [brandData]);
  //   const sliderClick = (list) => {
  //     navigate(`/brand/${list._id}`);
  //   };
  const [slidesData, setSlidesData] = useState([]);
  useEffect(() => {
    const slides = brands?.map((data, index) => ({
      image: `${BASE_URL}categories/brand_image/${data?.brand_image}`,
      title: `${data?.name}`,
      //description: `Item - ${brands[index]?.length}`,
      clickEvent: () => navigate(`/brand/${data._id}`),
    }));

    setSlidesData(slides);
  }, [brands, navigate]);
  return (
    <div className="mt-3 mb-3">
      <div className="home-section">
        <p className=" font-heading">Product Brand</p>
      </div>

      <div className="d-flex justify-content-center">
        <ReactCardSlider slides={slidesData && slidesData} />
      </div>
    </div>
  );
};

export default SliderBrand;
