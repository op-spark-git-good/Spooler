import React from "react";
<<<<<<< HEAD
import { Routes, Route, Link } from "react-router-dom";
import Fabrics from "./Fabrics.jsx";
import Home from "./Home.jsx";
import Layout from "./Layout.jsx";
import Notions from "./Notions.jsx";
=======
import {Route, Routes } from "react-router-dom";
import Navbar from './NavBar.jsx'; 
import Fabrics from "./Fabrics.jsx";
import Home from "./Home.jsx";
import Layout from "./Layout.jsx";
import Notions from "./Notions/Notions.jsx";
import Patterns from "./Patterns/Pattern.jsx";
>>>>>>> 25e58f3789caec46e49814af55dadb3fd5acde30

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
