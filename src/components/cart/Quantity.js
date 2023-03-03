import React, { useEffect, useState } from "react";

const Quantity = ({ quantityChange, quantityValue }) => {
  const [quantity, setQuantity] = useState(quantityValue ? quantityValue : 1);
  useEffect(() => {
    setQuantity(quantityValue && quantityValue);
  }, [quantityValue]);
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };
  useEffect(() => {
    if (quantity) {
      quantityChange(quantity);
    }
  }, [quantity, quantityChange]);
  const handleIncrement = (e) => {
    e.preventDefault();
    setQuantity(quantity + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="input-group">
      <button onClick={(e) => handleDecrement(e)} className="btn btn-secondary">
        -
      </button>
      <input
        type="number"
        id="quantity"
        name="quantity"
        min="1"
        value={quantity && quantity}
        onChange={handleQuantityChange}
        className="form-control"
      />
      <button onClick={(e) => handleIncrement(e)} className="btn btn-secondary">
        +
      </button>
    </div>
  );
};

export default Quantity;
