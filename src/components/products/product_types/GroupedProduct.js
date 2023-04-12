import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import RelatedProduct from "../relatedProducts/RelatedProduct";
import LikeProduct from "../relatedProducts/LikeProduct";
import GroupProducts from "../relatedProducts/GroupProducts";
import { CollectProducts } from "../../common/CollectProducts";

const GroupedProduct = ({ handleChange, groupProductValues }) => {
  const productsData = CollectProducts();

  const productFilter = (product, productList) => {
    const products = product?.filter((data) =>
      productList?.find((id) => data?._id === id)
    );
    return products;
  };
  const groupProduct = productFilter(
    productsData,
    groupProductValues?.group_products
  );
  const likeProduct = productFilter(
    productsData,
    groupProductValues?.like_products
  );
  const relatedProduct = productFilter(
    productsData,
    groupProductValues?.related_products
  );
  const relatedproductName = (value) => {
    const data = {
      target: {
        name: "related_products",
        value: value,
      },
    };
    handleChange(data);
  };
  const likesproductName = (value) => {
    const data = {
      target: {
        name: "like_products",
        value: value,
      },
    };
    handleChange(data);
  };
  const groupproductName = (value) => {
    const data = {
      target: {
        name: "group_products",
        value: value,
      },
    };
    handleChange(data);
  };
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
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <div className="container p-2 border">
                <div className="mb-3">
                  <label className="form-label text-muted">SKU</label>
                  <input
                    type="text"
                    className="form-control p-2"
                    name="sku"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <div className="container p-2 border">
                <div className="mb-3">
                  <label className="form-label text-muted">Group Product</label>
                  <GroupProducts
                    productName={groupproductName}
                    groupName={groupProduct}
                  />
                </div>
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
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default GroupedProduct;
