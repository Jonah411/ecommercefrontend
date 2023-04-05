import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../feature/profileReducer/authProfile";

export const CollectProducts = () => {
  const { data: productData } = useGetAllProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [products, setProducts] = useState(productData?.data);
  useEffect(() => {
    setProducts(productData?.data);
  }, [productData]);
  return products;
};
