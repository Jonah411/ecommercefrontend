import React, { useEffect, useState } from "react";
import ReactCardSlider from "react-card-slider-component";
import { BASE_URL } from "../../constants/ConstaltsVariables";
import { useGetCategoriesQuery } from "../../feature/profileReducer/authProfile";

const SliderCard = () => {
  const { data: categoriesData } = useGetCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [categoriesList, setCategoriesList] = useState(
    categoriesData?.categories
  );
  const [slidesData, setSlidesData] = useState([]);
  useEffect(() => {
    setCategoriesList(categoriesData?.categories);
  }, [categoriesData]);
  useEffect(() => {
    const filteredCategories = categoriesList?.map((data) =>
      data?.filter((list) => !list?.sub_categories)
    );
    const filteredSubCategories = categoriesList?.map((data) =>
      data?.filter((list) => list?.sub_categories)
    );
    const slides = filteredCategories?.map((data, index) =>
      data?.map((li) => ({
        image: `${BASE_URL}categories/categories_image/${li?.categorie_image}`,
        title: `${li?.name}`,
        description: `SubItems - ${filteredSubCategories[index].length}`,
        //clickEvent: sliderClick,
      }))
    );
    let array = [];
    slides?.map((data) =>
      data.map((list) =>
        array.push({
          image: list?.image,
          title: list?.title,
          description: list?.description,
        })
      )
    );
    setSlidesData(array);
  }, [categoriesList]);
  return (
    <div className="mt-3 mb-3">
      <p className="fw-600 text-center text-muted font-heading">
        Product Categories
      </p>
      <ReactCardSlider slides={slidesData && slidesData} />
    </div>
  );
};

export default SliderCard;
