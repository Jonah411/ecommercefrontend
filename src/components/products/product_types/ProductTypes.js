import React, { useEffect, useState } from "react";
import SimpleProduct from "./SimpleProduct";
import GroupedProduct from "./GroupedProduct";
import { useGetProductTypesQuery } from "../../../feature/profileReducer/authProfile";

const ProductTypes = ({
  handleChange,
  selectedOption,
  handleSimpleProductChange,
  simpleProductValues,
  handleGroupProductChange,
  groupProductValues,
}) => {
  const { data: productsTypesData } = useGetProductTypesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [productTypes, setProductTypes] = useState();
  useEffect(() => {
    setProductTypes(productsTypesData?.data);
  }, [productsTypesData]);
  return (
    <div className="card mb-3">
      <div className="card-header">
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0">Product Types:</p>
          <select
            className="form-select"
            value={selectedOption}
            onChange={handleChange}
            name="product_types"
          >
            <option value="">Open this select product types</option>
            {productTypes?.map((data) => {
              return (
                <option value={data?._id} key={data?._id}>
                  {data?.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="card-body">
        {productTypes?.map((data) => {
          if (data?._id === selectedOption) {
            if (data?.name === "Simple Product") {
              return (
                <SimpleProduct
                  handleChange={handleSimpleProductChange}
                  simpleProductValues={simpleProductValues}
                  key={selectedOption}
                />
              );
            } else if (data?.name === "Grouped Product") {
              return (
                <GroupedProduct
                  key={selectedOption}
                  handleChange={handleGroupProductChange}
                  groupProductValues={groupProductValues}
                />
              );
            }
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ProductTypes;
