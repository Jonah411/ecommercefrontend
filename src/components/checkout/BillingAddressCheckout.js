import React from "react";

const BillingAddressCheckout = ({ handleChandeBilling, billingError }) => {
  return (
    <div className="mt-3">
      <div className="container-fluid p-0">
        <div className="heading">
          <h3 style={{ color: "#484c51" }}>Billing Address</h3>
        </div>
      </div>
      <div className="mt-3 mb-3">
        <form>
          <div className="row">
            <div className="mb-3 col-sm-12 col-md-6">
              <label className="form-label">
                First Name <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                className={
                  billingError?.first_name
                    ? "form-control form-billing form-billing-error"
                    : "form-control form-billing"
                }
                name="first_name"
                onChange={handleChandeBilling}
              />
            </div>
            <div className="mb-3 col-sm-12 col-md-6">
              <label className="form-label">
                Last Name <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                className={
                  billingError?.last_name
                    ? "form-control form-billing form-billing-error"
                    : "form-control form-billing"
                }
                name="last_name"
                onChange={handleChandeBilling}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Company Name <span className="text-muted ">(Optional)</span>
            </label>
            <input
              type="text"
              className="form-control form-billing"
              name="company_name"
              onChange={handleChandeBilling}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Street Address <span className="text-danger fw-bold">*</span>
            </label>
            <input
              type="text"
              className={
                billingError?.street_name
                  ? "form-control form-billing form-billing-error"
                  : "form-control form-billing"
              }
              placeholder="House number and Street name"
              name="street_name"
              onChange={handleChandeBilling}
            />
            <input
              type="text"
              className="form-control form-billing"
              placeholder="Apartment ,suite,unit,etc ..(optional)"
              name="apartment_name"
              onChange={handleChandeBilling}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Town / City <span className="text-danger fw-bold">*</span>
            </label>
            <input
              type="text"
              className={
                billingError?.town_city
                  ? "form-control form-billing form-billing-error"
                  : "form-control form-billing"
              }
              name="town_city"
              onChange={handleChandeBilling}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              PostCode <span className="text-danger fw-bold">*</span>
            </label>
            <input
              type="email"
              className={
                billingError?.post_code
                  ? "form-control form-billing form-billing-error"
                  : "form-control form-billing"
              }
              name="post_code"
              onChange={handleChandeBilling}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Email <span className="text-danger fw-bold">*</span>
            </label>
            <input
              type="email"
              className={
                billingError?.email
                  ? "form-control form-billing form-billing-error"
                  : "form-control form-billing"
              }
              name="email"
              onChange={handleChandeBilling}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Phone Number <span className="text-danger fw-bold">*</span>
            </label>
            <input
              type="email"
              className={
                billingError?.phone_number
                  ? "form-control form-billing form-billing-error"
                  : "form-control form-billing"
              }
              name="phone_number"
              onChange={handleChandeBilling}
            />
          </div>
          <div className="heading">
            <h3 style={{ color: "#484c51" }}>Addtional Information</h3>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Order notes <span className="text-muted">(optional)</span>
            </label>
            <textarea
              type="text"
              className="form-control form-billing"
              maxLength={3}
              name="additional_inform"
              onChange={handleChandeBilling}
            ></textarea>
            {/* <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillingAddressCheckout;
