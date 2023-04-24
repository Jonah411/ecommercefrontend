import React from "react";
import Accordion from "react-bootstrap/Accordion";
import VariantsForm from "./VariantsForm";

const VariantsDetail = ({ variantValue, variantIndex }) => {
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
                      name="backorders_status"
                      // onChange={handleChange}
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
          <VariantsForm />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default VariantsDetail;
