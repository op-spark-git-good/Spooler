import React from "react";
import { Routes, Route } from "react-router-dom";
import Fabrics from "./Fabrics.jsx";
import Home from "./Home.jsx";
import Layout from "./Layout.jsx";
import Notions from "./Notions.jsx";
import Projects from "./Projects.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="fabrics" element={<Fabrics />} />
          <Route path="notions" element={<Notions />} />
          <Route path="projects" element={<Projects />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
