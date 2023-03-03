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
          </Routes>
        </Box>
      </Container>
    </Router>
  );
};

export default App;
