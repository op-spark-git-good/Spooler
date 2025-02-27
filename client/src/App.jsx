import React from "react";
import { Routes, Route } from "react-router-dom";
import Fabrics from "./Fabrics.jsx";
import Home from "./Home.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fabrics" element={<Fabrics />} />
    </Routes>
  );
}

export default App;
