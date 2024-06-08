import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllProducts from "./pages/AllProducts";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
