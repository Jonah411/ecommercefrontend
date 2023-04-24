import React, { useState, useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Quantity = ({
  quantityValue,
  onQuantityChange,
  maxValue,
  soldIndividually,
  minValue,
  backordersstatus,
}) => {
  const [quantity, setQuantity] = useState(quantityValue);
  useEffect(() => {
    setQuantity(minValue ? minValue : quantityValue);
  }, [quantityValue, minValue]);

  const handleQuantityChange = (e) => {
    const inputValue = e.target.value;
    console.log("inputValue", inputValue);
    const min = minValue || 1;
    const max = maxValue || Number.MAX_SAFE_INTEGER;

    if (inputValue === "" || (inputValue >= min && inputValue <= max)) {
      const newQuantity = parseInt(inputValue, 10);
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    } else if (inputValue <= min) {
      setQuantity(min);
      onQuantityChange(min);
    } else if (inputValue >= max) {
      setQuantity(max);
      onQuantityChange(max);
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
  const decrementtooltip = soldIndividually ? (
    <Tooltip id="tooltip-disabled">Limit purchases to 1 item per order</Tooltip>
  ) : minValue >= quantity ? (
    <Tooltip id="tooltip-disabled">
      Minimum purchases quantity {minValue}
    </Tooltip>
  ) : (
    <Tooltip id="tooltip-disabled">Decrement Quantity</Tooltip>
  );
  const incrementtooltip = soldIndividually ? (
    <Tooltip id="tooltip-disabled">Limit purchases to 1 item per order</Tooltip>
  ) : maxValue <= quantity ? (
    <Tooltip id="tooltip-disabled">{backordersstatus}</Tooltip>
  ) : (
    <Tooltip id="tooltip-disabled">Increment Quantity</Tooltip>
  );
  return (
    <div className="input-group">
      <OverlayTrigger overlay={decrementtooltip}>
        <span className="d-inline-block">
          <button
            onClick={handleDecrement}
            className="btn btn-secondary"
            disabled={
              soldIndividually
                ? soldIndividually
                : minValue >= quantity
                ? true
                : false
            }
          >
            -
          </button>
        </span>
      </OverlayTrigger>
      {/* <button
        onClick={handleDecrement}
        className="btn btn-secondary"
        disabled={
          soldIndividually
            ? soldIndividually
            : minValue >= quantity
            ? true
            : false
        }
      >
        -
      </button> */}
      <input
        type="number"
        id="quantity"
        name="quantity"
        min={minValue ? minValue : 1}
        max={`${maxValue}`}
        value={
          minValue
            ? quantity < minValue
              ? minValue
              : quantity
            : maxValue
            ? quantity > maxValue
              ? maxValue
              : quantity
            : quantity
        }
        //value={quantity}
        onChange={handleQuantityChange}
        className="form-control custom-input"
        disabled={soldIndividually && soldIndividually}
      />
      <OverlayTrigger overlay={incrementtooltip}>
        <span className="d-inline-block">
          <button
            onClick={handleIncrement}
            className="btn btn-secondary"
            disabled={
              soldIndividually
                ? soldIndividually
                : maxValue && maxValue <= quantity
                ? true
                : false
            }
          >
            +
          </button>
        </span>
      </OverlayTrigger>
      {/* <button
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
      </button> */}
    </div>
  );
};

export default Quantity;
