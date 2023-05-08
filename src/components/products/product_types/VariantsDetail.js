import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import VariantsForm from "./VariantsForm";

const VariantsDetail = ({
  variantValue,
  variantIndex,
  variantFormValues,
  handleVariantChange,
  productImage,
  productGallery,
  variantData,
}) => {
  const [defaultValueVariant, setDefaultValueVariant] = useState([
    { default_value_variant: "" },
  ]);
  const handleValueVariantChange = (e, index) => {
    const { name, value } = e.target;
    const newList = [...defaultValueVariant];
    newList[index] = { ...newList[index], [name]: value };
    setDefaultValueVariant(newList);
  };
  useEffect(() => {
    if (defaultValueVariant) {
      const dataId = {
        target: {
          name: "default_value_variant",
          value: defaultValueVariant,
        },
      };
      handleVariantChange(dataId);
    }
  }, [defaultValueVariant]);
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey={variantIndex}>
        <Accordion.Header>
          {variantValue ? (
            variantValue?.map((variableproduct, index) => {
              if (variableproduct) {
                return (
                  <div className="d-flex gap-2" key={index}>
                    <select
                      className="form-select"
                      //   value={productValues.backorders_status}
                      name="default_value_variant"
                      onChange={(e) => handleValueVariantChange(e, index)}
                    >
                      <option value="default">
                        No default {variableproduct?.attr_name}
                      </option>
                      {variableproduct?.attr_values?.map((data, index) => {
                        return (
                          <option value={data} key={index}>
                            {data}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              } else {
                return <div key={index}>Add Atributes</div>;
              }
            })
          ) : (
            <></>
          )}
        </Accordion.Header>
        <Accordion.Body>
          <VariantsForm
            handleVariantChange={handleVariantChange}
            productImage={productImage}
            productGallery={productGallery}
            variantFormValues={variantFormValues}
            variantIndex={variantIndex}
            variantData={variantData}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default VariantsDetail;
