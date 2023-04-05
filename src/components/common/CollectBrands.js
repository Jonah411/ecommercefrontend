import { useEffect, useState } from "react";
import { useGetAllBrandsQuery } from "../../feature/profileReducer/authProfile";

export const CollectBrands = () => {
  const { data: brandData } = useGetAllBrandsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const [brands, setBrands] = useState([]);
  useEffect(() => {
    if (brandData) {
      setBrands(brandData?.data);
    }
  }, [brandData]);

  const brandName = brands?.map((data) => {
    return data?.name;
  });
  const joinedArray = brandName
    .flat()
    .filter((item) => item !== null && item !== undefined);
  return joinedArray;
};
