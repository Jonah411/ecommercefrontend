import React, { useEffect, useState } from "react";
import SimpleProduct from "./SimpleProduct";
import GroupedProduct from "./GroupedProduct";
import { useGetProductTypesQuery } from "../../../feature/profileReducer/authProfile";
import VariableProduct from "./VariableProduct";

const ProductTypes = ({
  handleChange,
  selectedOption,
  handleSimpleProductChange,
  simpleProductValues,
  handleGroupProductChange,
  groupProductValues,
  formValues,
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
          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={formValues?.virtual}
                checked={formValues && formValues?.virtual}
                name="virtual"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Virtual
              </label>
            </div>
          </div>
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
            } else if (data?.name === "Variable Product") {
              return (
                <VariableProduct
                  key={selectedOption}
                  variantName={data?.name}
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
