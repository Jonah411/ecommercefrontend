import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import ListProduct from "./pages/ListProduct";
import SearchProducts from "./pages/SearchProducts";
import Profile from "./pages/profile/Profile";
import ProductDetail from "./components/products/ProductDetail";
import ListBrand from "./components/brand/ListBrand";
import "./App.css";
import CartDashboard from "./components/cart/CartDashboard";
import CheckoutDashboard from "./components/checkout/CheckoutDashboard";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";
import AddRatingReviews from "./components/rating-and-reviews/AddRatingReviews";
import HomeDashboard from "./pages/HomeDashboard";
import CompareDashboard from "./pages/CompareDashboard";
import AlertToast from "./components/common/AlertToast";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category/:name" element={<ListProduct />} />
        <Route path="/search_products" element={<SearchProducts />} />
        <Route path="/products" element={<HomeDashboard />} />
        <Route path="/compare-products" element={<CompareDashboard />} />
        <Route path="/product_details/:id" element={<ProductDetail />} />
        <Route
          path="/product_details/:id/create-review"
          element={<AddRatingReviews />}
        />
        <Route path="/cart" element={<CartDashboard />} />
        <Route path="/checkout" element={<CheckoutDashboard />} />
        <Route path="/brand/:name" element={<ListBrand />} />
        <Route path="/profile/*" element={<Profile />}></Route>
      </Routes>
      <Footer />
      <AlertToast />
    </Router>
  );
};

export default App;
