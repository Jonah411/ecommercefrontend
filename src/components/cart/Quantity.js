import React, { useState, useEffect } from "react";

const Quantity = ({
  quantityValue,
  onQuantityChange,
  maxValue,
  soldIndividually,
}) => {
  const [quantity, setQuantity] = useState(quantityValue);
  useEffect(() => {
    setQuantity(quantityValue);
  }, [quantityValue]);

  const handleQuantityChange = (e) => {
    const inputValue = e.target.value;
    if (
      inputValue === "" ||
      (inputValue >= 1 && inputValue <= (maxValue || inputValue))
    ) {
      const newQuantity = parseInt(inputValue, 10);
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    } else if (inputValue > (maxValue || inputValue)) {
      setQuantity(maxValue ? maxValue : inputValue);
      onQuantityChange(maxValue ? maxValue : inputValue);
    }
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
      <button
        onClick={handleDecrement}
        className="btn btn-secondary"
        disabled={soldIndividually && soldIndividually}
      >
        -
      </button>
      <input
        type="number"
        id="quantity"
        name="quantity"
        min="1"
        max={`${maxValue}`}
        value={
          maxValue ? (quantity <= maxValue ? quantity : maxValue) : quantity
        }
        //value={quantity}
        onChange={handleQuantityChange}
        className="form-control custom-input"
        disabled={soldIndividually && soldIndividually}
      />
      <button
        onClick={handleIncrement}
        className="btn btn-secondary"
        disabled={
          soldIndividually
            ? soldIndividually
            : maxValue
            ? maxValue <= quantity
            : false
        }
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
