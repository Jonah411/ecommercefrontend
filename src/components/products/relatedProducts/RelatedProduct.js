import React, { useCallback, useEffect, useState } from "react";
import { CollectBrands } from "../../common/CollectBrands";
import { CollectCategories } from "../../common/CollectCategories";
import { BrandsFilter, categoriesFilter } from "../../filter/Alphabetically";
import { CollectProducts } from "../../common/CollectProducts";
import MultiselectProducts from "../../common/MultiselectProducts";

const RelatedProduct = ({ productName }) => {
  const brandsList = CollectBrands();
  const categoriesList = CollectCategories();
  const products = CollectProducts();
  const init = {
    product_related_type: "",
    product: [],
  };
  const [related, setRelated] = useState(init);
  const [productList, setProductList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRelated({ ...related, [name]: value });
  };
  // useEffect(() => {
  //   if (related?.product.length !== 0) {

  //   }
  // }, [related]);
  const memoizedProductName = useCallback((product) => {
    productName(product && product);
  }, []);

  useEffect(() => {
    if (related?.product.length !== 0) {
      memoizedProductName(related && related?.product);
    }
  }, [related, memoizedProductName]);
  useEffect(() => {
    if (related?.product_related_type === "Categories") {
      const filteredProducts = categoriesFilter(related.categorie, products);
      setProductList(filteredProducts);
    } else if (related?.product_related_type === "Brands") {
      const filteredProducts = BrandsFilter(products, related.brand);
      setProductList(filteredProducts);
    } else {
      setProductList(products);
    }
  }, [related, products]);
  return (
    <div className="card p-2">
      <div className="">
        <h6 className="fw-bold text-muted m-0">Related Product</h6>
        <div>
          <div className="container p-3">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-3">
                <p className="fw-bold text-muted m-0">Select Types</p>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-9">
                <div className="mt-2 mb-2">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="Brands"
                      name="product_related_type"
                      checked={related.product_related_type === "Brands"}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      Brands
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="Categories"
                      name="product_related_type"
                      checked={related?.product_related_type === "Categories"}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox2"
                    >
                      Categories
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {related.product_related_type === "Brands" && (
              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-3">
                  <p className="fw-bold text-muted m-0">Brands</p>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-9">
                  <div className="mt-2 mb-2">
                    <select
                      className="form-select"
                      onChange={handleChange}
                      name="brand"
                    >
                      <option selected>Open this select brands</option>
                      {brandsList?.map((data, index) => {
                        return (
                          <option value={data} key={index}>
                            {data}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            )}
            {related.product_related_type === "Categories" && (
              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-3">
                  <p className="fw-bold text-muted m-0">Categories</p>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-9">
                  <div className="mt-2 mb-2">
                    <select
                      className="form-select"
                      onChange={handleChange}
                      name="categorie"
                    >
                      <option selected>Open this select categories</option>
                      {categoriesList?.map((data, index) => {
                        return (
                          <option value={data} key={index}>
                            {data}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-3">
                <p className="fw-bold text-muted m-0">Product</p>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-9">
                <div className="mt-2 mb-2">
                  <MultiselectProducts
                    products={productList}
                    handleChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
