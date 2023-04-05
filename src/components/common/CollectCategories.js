import { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../../feature/profileReducer/authProfile";

export const CollectCategories = () => {
  const { data: categoryData } = useGetCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData?.data);
    }
  }, [categoryData]);

  const categoryName = categories?.map((data) => {
    return data?.name;
  });
  const joinedArray = categoryName
    .flat()
    .filter((item) => item !== null && item !== undefined);
  return joinedArray;
};
