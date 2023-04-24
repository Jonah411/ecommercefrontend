import React, { useEffect, useRef, useState } from "react";
import NoImage from "../../../assets/noimage.png";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import Inventory from "./Inventory";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const VariantsForm = () => {
  const instVariant = {
    name: "",
    email: "",
    description: "",
    regular_price: "",
    sale_price: "",
    sale_price_start: "",
    sale_price_end: "",
    strength: "",
    pack_size: "",
    sku: "",
    stock_status: "In Stock",
    stock_quantity: "",
    backorders_status: "",
    stock_threshold: "",
    manage_stock: false,
    quantity_status: "",
    min_stock_quantity: "",
    sold_individually: false,
  };
  const editor = useRef(null);
  const [dateRangeShow, setDateRangeShow] = useState(true);
  const [variantFormValues, setVariantFormValues] = useState(instVariant);
  const [productImage, setProductImage] = useState();
  const [productGallery, setProductGallery] = useState();
  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file" && name === "product_image") {
      if (e.target.files) {
        let bannerImg = [];
        for (let i = 0; i < e.target.files.length; i++) {
          if (e.target.files[i].size <= 2000000) {
            bannerImg.push(e.target.files[i]);
            setProductImage({ ...productImage, [name]: bannerImg });
          } else {
            toast.error("Image size Big", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      }
    } else if (e.target.type === "file" && name === "product_gallery") {
      if (e.target.files) {
        let bannerImg = [];
        for (let i = 0; i < e.target.files.length; i++) {
          if (e.target.files[i].size <= 2000000) {
            bannerImg.push(e.target.files[i]);
            setProductGallery({ ...productGallery, [name]: bannerImg });
          } else {
            toast.error("Image size Big", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      }
    } else {
      setVariantFormValues({ ...variantFormValues, [name]: value });
    }
  };
  const init = {
    basic: false,
    inventory: false,
  };
  const [checkedForms, setCheckedForms] = useState(init);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handlecheckedChange = (e) => {
    const { name, checked } = e.target;
    setCheckedForms({ ...checkedForms, [name]: checked });
  };
  useEffect(() => {
    if (checkedForms?.inventory) {
      setShow(true);
    }
  }, [checkedForms?.inventory]);
  //console.log(variantFormValues);
  return (
    <div>
      <div className="border-bottom mb-3">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            value="basic"
            name="basic"
            onChange={handlecheckedChange}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Basic
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            value="inventory"
            name="inventory"
            onChange={handlecheckedChange}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox2">
            Inventory
          </label>
        </div>
      </div>
      <div className="d-flex gap-3 border-bottom">
        <div className="mb-3">
          <label htmlFor="">Product Image</label>
          <button className="btn btn-link">
            <label htmlFor="fileInput">
              {productImage ? (
                <img
                  src={
                    productImage &&
                    URL.createObjectURL(productImage?.product_image[0])
                  }
                  alt="image_product_added"
                  width={100}
                />
              ) : (
                <img src={NoImage} alt="no-image_photo" width={100} />
              )}
              Change image
            </label>
          </button>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            name="product_image"
            onChange={handleVariantChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="">Product Gallery</label>
          <button className="btn btn-link">
            <label htmlFor="fileInput">
              {productGallery && (
                <>
                  {productGallery &&
                    productGallery?.product_gallery?.map((image, index) => {
                      const url = URL.createObjectURL(image);
                      return (
                        <img
                          key={index}
                          src={url}
                          alt={`Product_Image_${index}`}
                          width={100}
                        />
                      );
                    })}
                </>
              )}
            </label>
          </button>
          <input
            type="file"
            id="fileInput"
            name="product_gallery"
            onChange={handleVariantChange}
          />
        </div>
      </div>
      <div className="mb-3 container border-bottom">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="">
              <label>Name:</label>
              <input
                className="form-control"
                name="name"
                onClick={handleVariantChange}
              />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6">
            <div className="">
              <label>Email:</label>
              <input
                className="form-control"
                name="email"
                onClick={handleVariantChange}
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Product Description</label>
          <JoditEditor
            ref={editor}
            // value={formValue?.description}
            tabIndex={1}
            onChange={(e) => {
              let data = {
                target: {
                  name: "description",
                  value: e,
                },
              };
              handleVariantChange(data);
            }}
          />
        </div>
      </div>
      <div className="mb-3 container ">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="mb-3">
              <label className="form-label text-muted">Regular Price</label>
              <input
                type="number"
                className="form-control p-2"
                name="regular_price"
                // value={simpleProductValues?.regular_price}
                onChange={handleVariantChange}
              />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6">
            <div className="mb-3">
              <label className="form-label text-muted">Sales Price</label>
              <input
                type="number"
                className="form-control p-2"
                name="sale_price"
                // value={simpleProductValues?.regular_price}
                onChange={handleVariantChange}
              />
            </div>
            <div className="d-flex justify-content-end">
              <p
                className="m-0 text-primary"
                onClick={() => setDateRangeShow(!dateRangeShow)}
              >
                Show date range
              </p>
            </div>
          </div>
        </div>
        {dateRangeShow && (
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6">
              <div className="mb-3">
                {" "}
                <input
                  type="date"
                  className="form-control p-2"
                  name="sale_price_start"
                  //   value={formattedSalePriceStart}
                  onChange={handleVariantChange}
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="mb-3">
                {" "}
                <input
                  type="date"
                  className="form-control p-2"
                  name="sale_price_end"
                  //  value={formattedSalePriceEnd}
                  onChange={handleVariantChange}
                />
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="mb-3">
              <label>Strength</label>
              <input
                type="number"
                className="form-control p-2"
                name="strength"
                //   value={formattedSalePriceStart}
                onChange={handleVariantChange}
              />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6">
            <div className="mb-3">
              <label>Packet Size</label>
              <input
                type="number"
                className="form-control p-2"
                name="pack_size"
                //  value={formattedSalePriceEnd}
                onChange={handleVariantChange}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Inventory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Inventory
            productValues={variantFormValues}
            handleChange={handleVariantChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VariantsForm;
