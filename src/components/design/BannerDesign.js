import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { BASE_URL } from "../../constants/ConstaltsVariables";
import { useGetActiveBannerQuery } from "../../feature/profileReducer/authProfile";

const BannerDesign = () => {
  const { data: brannerData } = useGetActiveBannerQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    if (brannerData) {
      setBanner(brannerData?.data);
    }
  }, [brannerData]);
  console.log(banner);
  return (
    <div className="border">
      <Carousel
        interval={null}
        indicators={true}
        indicatorClassName="custom-indicators"
        prevIcon={null}
        nextIcon={null}
      >
        {banner &&
          banner?.map((data) => {
            return (
              <Carousel.Item key={data?.brand?._id}>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-4 p-0">
                    <div className="">
                      <img
                        src={`${BASE_URL}categories/brand_image/${data?.name}`}
                        className="banner-image"
                        alt={data?.name}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-8 p-3 bg-secondary">
                    <div className="slider">
                      <h3>{data.brand.name}</h3>
                      <p>{data.brand.description}</p>
                      <button className="btn btn-primary">Go To Product</button>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </div>
  );
};

export default BannerDesign;
