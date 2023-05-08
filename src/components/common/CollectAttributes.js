import React from "react";
import { useGetAttributesQuery } from "../../feature/profileReducer/authProfile";

export const CollectAttributes = (id) => {
  console.log(id);
  const { data: attributesData } = useGetAttributesQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  return attributesData;
};
