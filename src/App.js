// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListing from "./ProductListing";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListing />} />
      </Routes>
    </Router>
  );
}

export default App;
