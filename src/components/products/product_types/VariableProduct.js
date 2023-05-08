import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Inventory from "./Inventory";
import { CollectProducts } from "../../common/CollectProducts";
import RelatedProduct from "../relatedProducts/RelatedProduct";
import LikeProduct from "../relatedProducts/LikeProduct";
import AttributesDetails from "./AttributesDetails";
import Variants from "./Variants";

const VariableProduct = ({ variantName, variableProduct, handleChange }) => {
  const productsData = CollectProducts();
  const variantInt = {
    sku: "",
    manage_stock: false,
    stock_quantity: "",
    backorders_status: "",
    stock_threshold: "",
    quantity_status: "",
    min_stock_quantity: "",
    stock_status: "In Stock",
    related_products: [],
    like_products: [],
    attributes: "",
    variantId: "",
    defaultform: "",
  };
  const [variableProductValues, setVariableProductValues] =
    useState(variantInt);
  const handleVariableChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "quantity_status") {
      if (value === "sold_individually") {
        setVariableProductValues({ ...variableProductValues, [name]: value });
      }
    }
    if (name === "manage_stock" || name === "sold_individually") {
      setVariableProductValues({ ...variableProductValues, [name]: checked });
    } else {
      setVariableProductValues({ ...variableProductValues, [name]: value });
    }
  };
  const productFilter = (product, productList) => {
    const products = product?.filter((data) =>
      productList?.find((id) => data?._id === id)
    );
    return products;
  };
  const relatedProduct = productFilter(
    productsData,
    variableProduct?.related_products
  );
  const likeProduct = productFilter(
    productsData,
    variableProduct?.like_products
  );
  const relatedproductName = (value) => {
    const data = {
      target: {
        name: "related_products",
        value: value,
      },
    };
    handleVariableChange(data);
  };
  const likesproductName = (value) => {
    const data = {
      target: {
        name: "like_products",
        value: value,
      },
    };
    handleVariableChange(data);
  };
  useEffect(() => {
    handleChange(variableProductValues);
  }, [variableProductValues, handleChange]);
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3} className="bg-secondary p-2">
          <Nav variant="pills" className="flex-column ">
            <Nav.Item>
              <Nav.Link eventKey="first" className="text-light">
                Inventory
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second" className="text-light">
                Linked Product
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="three" className="text-light">
                Attributes
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="four" className="text-light">
                Variation
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <div className="container p-2 border">
                <Inventory
                  productValues={variableProductValues}
                  handleChange={handleVariableChange}
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <div className="container p-2 border">
                <div className="mb-3">
                  <label className="form-label text-muted">
                    Related Product
                  </label>
                  <RelatedProduct
                    productName={relatedproductName}
                    relatedName={relatedProduct}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted">
                    You may also like
                  </label>
                  <LikeProduct
                    productName={likesproductName}
                    likeName={likeProduct}
                  />
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="three">
              <div className="container p-2 border">
                <AttributesDetails
                  handleChange={handleVariableChange}
                  ProductValues={variableProductValues}
                  variantName={variantName}
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="four">
              <div className="container p-2 border">
                <Variants
                  ProductValues={variableProductValues}
                  handleChange={handleVariableChange}
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default VariableProduct;
