import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Fabrics from "./Fabrics.jsx";
import Home from "./Home.jsx";
import Layout from "./Layout.jsx";
import Notions from "./Notions.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="fabrics" element={<Fabrics />} />
          <Route path="notions" element={<Notions />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
