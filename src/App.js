import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MainHeader from "./layout/MainHeader";
import Home from "./pages/Home";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <MainHeader />
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "#cfe8fc" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
};

export default App;
