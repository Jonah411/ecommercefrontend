import React, { useState, useEffect } from "react";

const Quantity = ({ quantityValue, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(quantityValue);
  useEffect(() => {
    setQuantity(quantityValue);
  }, [quantityValue]);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="input-group">
      <button onClick={handleDecrement} className="btn btn-secondary">
        -
      </button>
      <input
        type="number"
        id="quantity"
        name="quantity"
        min="1"
        value={quantity}
        onChange={handleQuantityChange}
        className="form-control custom-input"
      />
      <button onClick={handleIncrement} className="btn btn-secondary">
        +
      </button>
    </div>
  );
};

export default Quantity;
