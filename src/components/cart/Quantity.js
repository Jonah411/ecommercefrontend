import React, { useEffect, useState } from "react";

const Quantity = ({ quantityChange, quantityValue }) => {
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    setQuantity(quantityValue);
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
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
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
        className="form-control"
      />
      <button onClick={handleIncrement} className="btn btn-secondary">
        +
      </button>
    </div>
  );
};

export default Quantity;
