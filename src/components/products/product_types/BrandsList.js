import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { FaAngleDown } from "react-icons/fa";
import { CollectBrandsList } from "../../common/CollectBrands";
import { useNavigate } from "react-router-dom";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return <FaAngleDown onClick={decoratedOnClick} className="nav-link" />;
}

const BrandsList = ({ selectedBrand, handleChange }) => {
  const brands = CollectBrandsList();
  const navigate = useNavigate();

  return (
    <>
      <Accordion defaultActiveKey="0">
        <div className="card mb-3">
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <p>Brands</p>
              <CustomToggle eventKey="0">Click me!</CustomToggle>
            </div>
          </div>
          <Accordion.Collapse eventKey="0">
            <div className="card-body">
              <form>
                <div className="form-check">
                  {brands?.map((data) => {
                    return (
                      <div key={data._id}>
                        <input
                          className="form-check-input"
                          type="radio"
                          value={data._id}
                          name="brand"
                          onChange={handleChange}
                          checked={selectedBrand === data._id}
                        />
                        <label className="form-check-label" htmlFor={data._id}>
                          {data?.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </form>
            </div>
          </Accordion.Collapse>

          <div className="card-footer">
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-link"
                onClick={() => navigate("/profile/brand")}
              >
                Add Brands
              </button>
            </div>
          </div>
        </div>
      </Accordion>
    </>
  );
};

export default BrandsList;
