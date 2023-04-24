import React from "react";
import TooltipMsg from "../../design/TooltipMsg";

const Inventory = ({ productValues, handleChange }) => {
  return (
    <div>
      <div className="mb-3">
        <label className="form-label text-muted">SKU</label>
        <input
          type="text"
          className="form-control p-2"
          name="sku"
          value={productValues?.sku}
          onChange={handleChange}
        />
        <div className="mb-3">
          <label className="form-label text-muted">Manage stock?</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={productValues?.manage_stock}
              checked={productValues && productValues?.manage_stock}
              name="manage_stock"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              Manage stock level (quantity)
            </label>
          </div>
        </div>
        {productValues && productValues?.manage_stock ? (
          <>
            <div className="mb-3">
              <label className="form-label text-muted">Stock Quantity</label>
              <div className="d-flex gap-2">
                <input
                  className="form-control"
                  type="number"
                  placeholder="quantity"
                  name="stock_quantity"
                  onChange={handleChange}
                  value={productValues?.stock_quantity}
                />
                <TooltipMsg
                  text={
                    "Stock quantity. If this is a variable Product this value will be used to control stock for all variations. Unless you define stock at variation level."
                  }
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label text-muted">Allow Backorders</label>
              <div className="d-flex gap-2">
                <select
                  className="form-select"
                  value={productValues.backorders_status}
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
                  value={productValues?.stock_threshold}
                />
                <TooltipMsg
                  text={
                    "When product stoct reaches this amount you will be notified by email"
                  }
                />
              </div>
            </div>
            <hr />
            <div className="mb-3">
              <label>
                <input
                  type="radio"
                  name="quantity_status"
                  value="min_quantity"
                  onChange={handleChange}
                  checked={productValues?.quantity_status === "min_quantity"}
                />
                Min Quantity
              </label>
              <label className="ms-2">
                <input
                  type="radio"
                  name="quantity_status"
                  value="sold_individually"
                  onChange={handleChange}
                  checked={
                    productValues?.quantity_status === "sold_individually"
                  }
                />
                Limit purchases to 1 item per order
              </label>
            </div>
            {productValues?.quantity_status === "min_quantity" && (
              <div className="mb-3">
                <label className="form-label text-muted">
                  Minimum Stock Quantity
                </label>
                <div className="d-flex gap-2">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="minimum stock quantity"
                    name="min_stock_quantity"
                    onChange={handleChange}
                    value={productValues?.min_stock_quantity}
                  />
                  <TooltipMsg
                    text={
                      "Stock quantity. If this is a variable Product this value will be used to control stock for all variations. Unless you define stock at variation level."
                    }
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-3">
              <label className="form-label text-muted">Stock status</label>
              <select
                className="form-select"
                value={productValues?.stock_status}
                name="stock_status"
                onChange={handleChange}
              >
                <option value="default">Open this select stock status</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of stock">Out of stock</option>
                <option value="On backorder" disabled>
                  On backorder
                </option>
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Inventory;
