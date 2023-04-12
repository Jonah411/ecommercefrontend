import React, { useEffect, useState } from "react";
import { CollectBrands } from "../../common/CollectBrands";
import { CollectCategories } from "../../common/CollectCategories";
import { BrandsFilter, categoriesFilter } from "../../filter/Alphabetically";
import { CollectProducts } from "../../common/CollectProducts";
import MultiselectProducts from "../../common/MultiselectProducts";

const LikeProduct = ({ productName, likeName }) => {
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
    if (name === "product") {
      productName(value);
    }
    setRelated({ ...related, [name]: value });
  };

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
      <div className="container p-3">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-3">
            <p className="fw-bold text-muted mt-2 mb-2">Select Types</p>
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
                <label className="form-check-label" htmlFor="inlineCheckbox1">
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
                <label className="form-check-label" htmlFor="inlineCheckbox2">
                  Categories
                </label>
              </div>
            </div>
          </div>
        </div>
        {related.product_related_type === "Brands" && (
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-3">
              <p className="fw-bold text-muted mt-2 mb-2">Brands</p>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-9">
              <div className="mt-2 mb-2">
                <select
                  className="form-select"
                  onChange={handleChange}
                  name="brand"
                  value={related?.brand || ""}
                  defaultValue="Open this select brands"
                >
                  <option disabled>Open this select brands</option>
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
              <p className="fw-bold text-muted mt-2 mb-2">Categories</p>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-9">
              <div className="mt-2 mb-2">
                <select
                  className="form-select"
                  onChange={handleChange}
                  name="categorie"
                  value={related?.categorie || ""}
                  defaultValue="Open this select categories"
                >
                  <option disabled>Open this select categories</option>
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
            <p className="fw-bold text-muted mt-2 mb-2">Product</p>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-9">
            <div className="mt-2 mb-2">
              <MultiselectProducts
                products={productList}
                handleChange={handleChange}
                selectProducts={likeName}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikeProduct;
