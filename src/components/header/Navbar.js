import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import { useGetAllCartQuery } from "../../feature/profileReducer/authProfile";
import "../../styles/Navbar.css";
import SearchFilter from "../filter/SearchFilter";
import CartListNav from "./CartListNav";
import CartNav from "./CartNav";
import Nav from "./Nav";

const Navbar = () => {
  const auth = useSelector(getLoginDetails);
  const { data: cartData } = useGetAllCartQuery(auth?.id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const navigate = useNavigate();
  const [cart, setCart] = useState();
  const [price, setPrice] = useState();
  useEffect(() => {
    setCart(cartData?.carts?.items);
    setPrice(cartData?.totalPrice);
  }, [cartData]);
  const [showMedia, setShowMedia] = useState(false);
  return (
    <div className="search-header">
      <nav className="main_nav main_nav_header">
        <div
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <h2>
            <Link className="text-muted">
              <span>MERN - </span>
              <span className="ms-2">ECOMMERCE</span>
            </Link>
          </h2>
        </div>

        <div
          className={
            showMedia
              ? "menu_link menu_link_main mobile_menu_link"
              : "menu_link menu_link_main"
          }
        >
          {showMedia ? (
            <Nav />
          ) : (
            <ul>
              <li
                onClick={(e) => {
                  e.preventDefault();
                  if (auth) {
                    navigate("/profile/");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                <Link className="nav-link text-light link-text">
                  {auth ? auth?.first_name : "My Account"}
                </Link>
              </li>
              <li
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/products");
                }}
                className="ms-2"
              >
                <Link className="nav-link text-light link-text">Products</Link>
              </li>
            </ul>
          )}
        </div>

        <div className="social_media">
          <ul className="social_media_desktop">
            <li>
              <SearchFilter />
            </li>
          </ul>
          <div className="hamburger_menu">
            <Link
              href="#"
              onClick={() => setShowMedia(!showMedia)}
              className="text-muted"
            >
              <GiHamburgerMenu />
            </Link>
          </div>
        </div>
      </nav>
      <nav className="main_nav d-sm-none d-none d-lg-grid">
        <div className="menu_link_second menu_link">
          <Nav />
        </div>
        <div className="cart_link menu_link">
          <CartNav cart={cart} price={price} />
          <CartListNav cart={cart} price={price} />
        </div>
      </nav>
      <div className="m-2 d-lg-none d-md-grid">
        <ul className="social_media_desktop p-0 ">
          <li>
            <SearchFilter />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
