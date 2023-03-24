import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import BillingAddressCheckout from "./BillingAddressCheckout";
import { FaRegCheckCircle } from "react-icons/fa";
import ShippingAddressCheckout from "./ShippingAddressCheckout";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <button
      onClick={decoratedOnClick}
      className="btn btn-link text-decoration-none"
    >
      {children}
    </button>
  );
}

const CheckoutDetails = ({
  handleChandeBilling,
  billingError,
  billingForm,
  handleShippingChange,
  shippingDetails,
  shippingError,
}) => {
  const [errorBill, setErrorBill] = useState(billingError);
  const [errorShipping, setErrorShipping] = useState(shippingError);

  useEffect(() => {
    setErrorBill(billingError);
  }, [billingError]);
  useEffect(() => {
    setErrorShipping(shippingError);
  }, [shippingError]);
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between">
            <CustomToggle eventKey="0">
              <div className="heading">
                <h4 style={{ color: "#484c51" }} className="m-0">
                  Billing Address
                </h4>
              </div>
            </CustomToggle>
            {errorBill && (
              <div
                className={
                  Object.keys(errorBill).length !== 0
                    ? "bg-danger "
                    : "bg-success"
                }
              >
                <FaRegCheckCircle />
              </div>
            )}
          </div>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <BillingAddressCheckout
              handleChandeBilling={handleChandeBilling}
              billingError={billingError}
              billingForm={billingForm}
            />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between">
            <CustomToggle eventKey="1">
              <div className="heading">
                <h4 style={{ color: "#484c51" }} className="m-0">
                  Shipping Address
                </h4>
              </div>
            </CustomToggle>
            <div>
              {errorShipping && (
                <div
                  className={
                    Object.keys(errorShipping).length !== 0
                      ? "bg-danger "
                      : "bg-success"
                  }
                >
                  <FaRegCheckCircle />
                </div>
              )}
            </div>
          </div>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <ShippingAddressCheckout
              handleShippingChange={handleShippingChange}
              shippingDetails={shippingDetails}
              shippingError={shippingError}
            />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default CheckoutDetails;
