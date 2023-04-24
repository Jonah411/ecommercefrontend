import React, { useEffect, useState } from "react";
import TooltipMsg from "../../design/TooltipMsg";
import VariantsDetail from "./VariantsDetail";

const Variants = ({ ProductValues }) => {
  const [variantState, setVariantState] = useState({
    variationFunction: "Add Variation",
  });
  const [variantValue, setVariantValue] = useState(ProductValues?.attributes);
  const [defaultFormShow, setDefaultFormShow] = useState(false);
  const [variantForm, setVariantForm] = useState([]);
  useEffect(() => {
    setVariantValue(ProductValues?.attributes);
  }, [ProductValues]);

  const handleStateChange = (e) => {
    const { name, value } = e.target;
    setVariantState({ ...variantState, [name]: value });
  };
  const [myArray, setMyArray] = useState([]);
  const handleCreate = (e) => {
    e.preventDefault();
    if (variantState?.variationFunction === "Add Variation") {
      setDefaultFormShow(true);
      setMyArray([...myArray, "new element"]);
      setVariantForm((prevState) => [...prevState, { name: "" }]);
    }
  };
  return (
    <div>
      <div className="container">
        {defaultFormShow && (
          <div className="mb-3">
            <div className="d-flex gap-2 mb-2">
              <label className="form-label text-muted">
                Default Form Values
              </label>
              <TooltipMsg
                text={
                  "Choose a default form values if you want a certain variation already when a selector visit a product page."
                }
              />
            </div>
            <div className="d-flex gap-2">
              {variantValue ? (
                variantValue?.map((variableproduct, index) => {
                  if (variableproduct?.variations) {
                    return (
                      <select
                        className="form-select"
                        //   value={productValues.backorders_status}
                        name="backorders_status"
                        // onChange={handleChange}
                        key={index}
                      >
                        <option value="default">
                          No default {variableproduct?.attr_name}
                        </option>
                        {variableproduct?.attr_values?.map((data, index) => {
                          return (
                            <option value="Do Not Allow" key={index}>
                              {data}
                            </option>
                          );
                        })}
                      </select>
                    );
                  } else {
                    return <div key={index}>Add Atributes</div>;
                  }
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
        <div className="mb-3">
          <div className="d-flex gap-2">
            <select
              className="form-select"
              value={variantState?.variationFunction}
              name="variationFunction"
              onChange={handleStateChange}
            >
              <option value="Add Variation">Add Variation</option>
              <option value="default">Delete All Variations</option>
            </select>
            <button
              className="btn btn-outline-secondary"
              onClick={(e) => handleCreate(e)}
            >
              Go
            </button>
          </div>
        </div>
        <div className="mb-3">
          {myArray?.map((data, index) => {
            return (
              <VariantsDetail
                variantValue={variantValue}
                variantIndex={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Variants;
