import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MainHeader from "./layout/MainHeader";
import Home from "./pages/Home";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import ListProduct from "./pages/ListProduct";
import SearchProducts from "./pages/SearchProducts";
import Profile from "./pages/profile/Profile";
import ProductDetail from "./components/products/ProductDetail";
import ListCart from "./pages/ListCart";
import Checkout from "./pages/Checkout";
import ListBrand from "./components/brand/ListBrand";

const App = () => {
  return (
    <Router>
      <MainHeader />
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "#cfe8fc" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category/:name" element={<ListProduct />} />
            <Route path="/search_products" element={<SearchProducts />} />
            <Route path="/product_details/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<ListCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/brand/:name" element={<ListBrand />} />
            <Route path="/profile/*" element={<Profile />}></Route>
          </Routes>
        </Box>
      </Container>
    </Router>
  );
};

export default App;
