import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-design">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="wave-footer"
      >
        <path
          fill="#e7e6e6"
          fill-opacity="1"
          d="M0,128L48,149.3C96,171,192,213,288,224C384,235,480,213,576,197.3C672,181,768,171,864,165.3C960,160,1056,160,1152,144C1248,128,1344,96,1392,80L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      <div className="footer-content">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-6 col-lg-4">
            <div className="container footer-title">
              <h3>MERN -</h3>
              <h3 className="mb-3">ECOMMERCE</h3>
              <h5 className="text-muted">
                Secure your, and your family’s health today!
              </h5>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-4">
            <div className="footer-about d-flex justify-content-between">
              <div>
                <h3>About</h3>
                <p>
                  <Link className="text-muted">Contact Us</Link>
                </p>
                <p>
                  <Link className="text-muted">About us</Link>
                </p>
                <p>
                  <Link className="text-muted">About</Link>
                </p>
              </div>
              <div>
                <h3 className="text-muted">Social Media</h3>
                <div className="d-flex gap-2">
                  <Link className="text-muted">
                    <FaFacebook />
                  </Link>
                  <Link className="text-muted">
                    <FaInstagram />
                  </Link>
                  <Link className="text-muted">
                    <FaTwitter />
                  </Link>
                  <Link className="text-muted">
                    <FaYoutube />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-4">
            <div className="footer-about">
              <h3>Registered Office Address:</h3>
              <p className="m-0 text-muted">CompanyName PVT LTD</p>
              <p className="m-0 text-muted">Company Complax name</p>
              <p className="text-muted">Chennai - 600 000</p>
              <p className="m-0 text-muted">Phone No: 9090908978,8978986756.</p>
              <p className="m-0 text-muted">Email: companyname@gmail.com.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copy">
        <p className="text-center text-light m-0">© 2023-2028 .com </p>
      </div>
    </div>
  );
};

export default Footer;
