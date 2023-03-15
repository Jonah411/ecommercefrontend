import React from "react";

const BillingAddressCheckout = () => {
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
              <input type="email" className="form-control p-2" />
              {/* <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div> */}
            </div>
            <div className="mb-3 col-sm-12 col-md-6">
              <label className="form-label">
                {" "}
                Last Name <span className="text-danger fw-bold">*</span>
              </label>
              <input type="email" className="form-control p-2" />
              {/* <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div> */}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">
              {" "}
              Company Name <span className="text-muted ">(Optional)</span>
            </label>
            <input type="email" className="form-control p-2" />
            {/* <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div> */}
          </div>
          <div className="mb-3">
            <label className="form-label">
              {" "}
              Street Address <span className="text-danger fw-bold">*</span>
            </label>
            <input
              type="email"
              className="form-control p-2 mb-2"
              placeholder="House number and Street name"
            />
            <input
              type="email"
              className="form-control p-2"
              placeholder="Apartment ,suite,unit,etc ..(optional)"
            />
            {/* <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div> */}
          </div>
          <div className="mb-3">
            <label className="form-label">
              Town / City <span className="text-danger fw-bold">*</span>
            </label>
            <input type="email" className="form-control p-2" />
            {/* <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div> */}
          </div>
          <div className="mb-3">
            <label className="form-label">
              PostCode <span className="text-danger fw-bold">*</span>
            </label>
            <input type="email" className="form-control p-2" />
            {/* <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div> */}
          </div>
          <div className="mb-3">
            <label className="form-label">
              Email <span className="text-danger fw-bold">*</span>
            </label>
            <input type="email" className="form-control p-2" />
            {/* <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div> */}
          </div>
          <div className="mb-3">
            <label className="form-label">
              Phone Number <span className="text-danger fw-bold">*</span>
            </label>
            <input type="email" className="form-control p-2" />
            {/* <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div> */}
          </div>
          <div className="heading">
            <h3 style={{ color: "#484c51" }}>Addtional Information</h3>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Order notes <span className="text-muted">(optional)</span>
            </label>
            <textarea className="form-control" maxLength={3}></textarea>
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
