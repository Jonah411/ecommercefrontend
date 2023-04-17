import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import RelatedProduct from "../relatedProducts/RelatedProduct";
import LikeProduct from "../relatedProducts/LikeProduct";
import { CollectProducts } from "../../common/CollectProducts";
import TooltipMsg from "../../design/TooltipMsg";

const SimpleProduct = ({ handleChange, simpleProductValues }) => {
  const productsData = CollectProducts();

  const productFilter = (product, productList) => {
    const products = product?.filter((data) =>
      productList?.find((id) => data?._id === id)
    );
    return products;
  };

  const likeProduct = productFilter(
    productsData,
    simpleProductValues?.like_products
  );
  const relatedProduct = productFilter(
    productsData,
    simpleProductValues?.related_products
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

  const dateRange = (value) => {
    let formattedSalePrice = "";
    if (simpleProductValues?.sale_price_start) {
      const date = new Date(value);
      if (!isNaN(date)) {
        formattedSalePrice = date.toISOString().split("T")[0];
        return formattedSalePrice;
      }
    }
  };
  const formattedSalePriceStart = dateRange(
    simpleProductValues?.sale_price_start
  );
  const formattedSalePriceEnd = dateRange(simpleProductValues?.sale_price_end);
  console.log(simpleProductValues);
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3} className="bg-secondary p-2">
          <Nav variant="pills" className="flex-column ">
            <Nav.Item>
              <Nav.Link eventKey="first" className="text-light">
                Gentral
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second" className="text-light">
                Inventory
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="three" className="text-light">
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
                  <label className="form-label text-muted">Regular Price</label>
                  <input
                    type="number"
                    className="form-control p-2"
                    name="price"
                    value={simpleProductValues?.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted">Sale Price</label>
                  <input
                    type="text"
                    className="form-control p-2"
                    name="sale_price"
                    value={simpleProductValues?.sale_price}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted">
                    Sale Price Date
                  </label>
                  <div className="d-flex justify-content-start gap-2">
                    <input
                      type="date"
                      className="form-control p-2"
                      name="sale_price_start"
                      value={formattedSalePriceStart}
                      onChange={handleChange}
                    />
                    <input
                      type="date"
                      className="form-control p-2"
                      name="sale_price_end"
                      value={formattedSalePriceEnd}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted">
                    Product Strength
                  </label>
                  <input
                    type="text"
                    className="form-control p-2"
                    name="strength"
                    value={simpleProductValues?.strength}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted">Pack Size</label>
                  <input
                    type="text"
                    className="form-control p-2"
                    name="pack_size"
                    value={simpleProductValues?.pack_size}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <div className="container p-2 border">
                <div className="mb-3">
                  <label className="form-label text-muted">SKU</label>
                  <input
                    type="text"
                    className="form-control p-2"
                    name="sku"
                    value={simpleProductValues?.sku}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted">Manage stock?</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={simpleProductValues?.manage_stock}
                      checked={
                        simpleProductValues && simpleProductValues?.manage_stock
                      }
                      name="manage_stock"
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Manage stock level (quantity)
                    </label>
                  </div>
                </div>
                {simpleProductValues && simpleProductValues?.manage_stock ? (
                  <>
                    <div className="mb-3">
                      <label className="form-label text-muted">
                        Stock Quantity
                      </label>
                      <div className="d-flex gap-2">
                        <input
                          className="form-control"
                          type="number"
                          placeholder="quantity"
                          name="stock_quantity"
                          onChange={handleChange}
                          value={simpleProductValues?.stock_quantity}
                        />
                        <TooltipMsg
                          text={
                            "Stock quantity. If this is a variable Product this value will be used to control stock for all variations. Unless you define stock at variation level."
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-muted">
                        Allow Backorders
                      </label>
                      <div className="d-flex gap-2">
                        <select
                          className="form-select"
                          value={simpleProductValues.backorders_status}
                          name="backorders_status"
                          onChange={handleChange}
                        >
                          <option value="default">
                            Open this select backorders status
                          </option>
                          <option value="Do Not Allow">Do Not Allow</option>
                          <option value="Allow, but notify customers">
                            Allow, but notify customers
                          </option>
                          <option value="Allow">Allow</option>
                        </select>
                        <TooltipMsg
                          text={
                            "If managing stock, If controls whethere or not backorders are allowed, If enabled stock quantity can go below 0"
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-muted">
                        Low stock threshold
                      </label>
                      <div className="d-flex gap-2">
                        <input
                          className="form-control"
                          type="number"
                          name="stock_threshold"
                          placeholder="quantity"
                          onChange={handleChange}
                          value={simpleProductValues?.stock_threshold}
                        />
                        <TooltipMsg
                          text={
                            "When product stoct reaches this amount you will be notified by email"
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-muted">
                        Sold individually
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={simpleProductValues?.sold_individually}
                          checked={
                            simpleProductValues &&
                            simpleProductValues?.sold_individually
                          }
                          name="sold_individually"
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked"
                        >
                          Limit purchases to 1 item per order
                        </label>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="mb-3">
                    <label className="form-label text-muted">
                      Stock status
                    </label>
                    <select
                      className="form-select"
                      value={simpleProductValues.stock_status}
                      name="stock_status"
                      onChange={handleChange}
                    >
                      <option value="default">
                        Open this select stock status
                      </option>
                      <option value="In Stock">In Stock</option>
                      <option value="Out of stock">Out of stock</option>
                      <option value="On backorder" disabled>
                        On backorder
                      </option>
                    </select>
                  </div>
                )}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="three">
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
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default SimpleProduct;
