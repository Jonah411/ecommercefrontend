import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { FaAngleDown } from "react-icons/fa";
import NoImage from "../../../assets/noimage.png";
import { BASE_URL } from "../../../constants/ConstaltsVariables";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return <FaAngleDown onClick={decoratedOnClick} className="nav-link" />;
}

const ImageProduct = ({
  selectedFile,
  selectedGalleryFile,
  handleChange,
  productsImage,
}) => {
  return (
    <>
      <Accordion defaultActiveKey="0">
        <div className="card mb-3">
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <p>Product Image</p>
              <CustomToggle eventKey="0">Click me!</CustomToggle>
            </div>
          </div>
          <Accordion.Collapse eventKey="0">
            <div className="card-body">
              {selectedFile?.length > 0 ? (
                selectedFile?.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={100}
                  />
                ))
              ) : productsImage?.product_image ? (
                <img
                  className="img-thumbnil img-fluid"
                  src={`${BASE_URL}categories/product_image/image/${productsImage?.product_image}`}
                  alt=""
                  width={100}
                />
              ) : (
                <img
                  className="img-thumbnil img-fluid"
                  src={NoImage}
                  alt=""
                  width={100}
                />
              )}
            </div>
          </Accordion.Collapse>

          <div className="card-footer">
            <div className="d-flex justify-content-between">
              <div>
                <button className="btn btn-link">
                  <label htmlFor="fileInput">Change image</label>
                </button>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  name="product_image"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </Accordion>

      <Accordion defaultActiveKey="0">
        <div className="card mb-3">
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <p>Product Gallery</p>
              <CustomToggle eventKey="0">Click me!</CustomToggle>
            </div>
          </div>
          <Accordion.Collapse eventKey="0">
            <div className="card-body">
              {selectedGalleryFile?.length > 0 ? (
                selectedGalleryFile?.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={100}
                  />
                ))
              ) : productsImage?.product_gallery ? (
                productsImage?.product_gallery?.map((file, index) => (
                  <img
                    key={index}
                    src={`${BASE_URL}categories/product_image/image/${file}`}
                    alt={file.name}
                    width={100}
                  />
                ))
              ) : (
                <img
                  className="img-thumbnil img-fluid"
                  src={NoImage}
                  alt=""
                  width={100}
                />
              )}
            </div>
          </Accordion.Collapse>

          <div className="card-footer">
            <div className="d-flex justify-content-between">
              <div>
                <input
                  type="file"
                  id="fileInput"
                  name="product_gallery"
                  onChange={handleChange}
                  multiple
                />
              </div>
            </div>
          </div>
        </div>
      </Accordion>
    </>
  );
};

export default ImageProduct;
