import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import { useGetAddressQuery } from "../../feature/profileReducer/authProfile";

const ShippingAddressCheckout = ({
  handleShippingChange,
  shippingDetails,
  shippingError,
}) => {
  const user = useSelector(getLoginDetails);
  const { data: addressData } = useGetAddressQuery(user?.id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const navigate = useNavigate();
  return (
    <div
      className={
        shippingError?.shipping_check
          ? "card p-2 shipping-card shipping-card-error"
          : "card p-2 shipping-card"
      }
    >
      <div className="">
        <h5 className="text-light fw-bold shipping-heading">Main Address</h5>
        <p className="text-light fw-bold m-0">
          {addressData?.mainAddress?.name}
        </p>
        <p className="text-light fw-bold m-0">
          {addressData?.mainAddress?.street}
        </p>
        <p className="text-light fw-bold m-0">
          {addressData?.mainAddress?.state}
        </p>
        <p className="text-light fw-bold m-0">
          {addressData?.mainAddress?.country} - {addressData?.mainAddress?.zip}
        </p>
      </div>
      <div className="shipping-button">
        <button
          className="btn btn-secondary"
          onClick={(e) => {
            e.preventDefault();
            navigate("/profile/address");
          }}
        >
          Change
        </button>
      </div>
      <div
        className={
          shippingError?.shipping_check
            ? "card p-2 shipping-input shipping-card-error"
            : "card p-2 shipping-input"
        }
      >
        <input
          className="form-input"
          type="checkbox"
          name="shipping_check"
          checked={shippingDetails.shipping_check}
          onChange={handleShippingChange}
        />
      </div>
    </div>
  );
};

export default ShippingAddressCheckout;
