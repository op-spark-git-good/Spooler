import React from "react";
import {Route, Routes } from "react-router-dom";
import Navbar from './NavBar.jsx'; 
import Fabrics from "./Fabrics.jsx";
import Home from "./Home.jsx";
import Layout from "./Layout.jsx";
import Notions from "./Notions/Notions.jsx";
import Patterns from "./Patterns/Pattern.jsx";

function App() {
  return (
    <div className="App">
      <Navbar /> {/* Include the Navbar */}
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<Home />} />
        <Route path="fabrics" element={<Fabrics />} />
        <Route path="notions" element={<Notions />} />
        <Route path="patterns" element={<Patterns />} />
      </Routes>
    </div>
  );
}

export default App;
