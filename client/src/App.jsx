import React from "react";
import {Route, Routes } from "react-router-dom";
import Navbar from './NavBar.jsx'; 
import Fabrics from "./Fabrics.jsx";
import Home from "./Home.jsx";
import Layout from "./Layout.jsx";
import Notions from "./Notions/Notions.jsx";
import Patterns from "./Patterns/Pattern.jsx";
import PatternList from './Patterns/PatternList.jsx'
import PatternDetail from './Patterns/PatternDetail.jsx';
import Posts from "./Posts/Posts.jsx";


function App() {
  return (
    <div className="App">
      <Navbar /> {/* Include the Navbar */}
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<Home />} />
        <Route path="fabrics" element={<Fabrics />} />
        <Route path="notions" element={<Notions />} />
        <Route path="/patterns" element={<PatternList />} /> 
        <Route path="/patterns/:id" element={<PatternDetail />} />
        <Route path="posts" element={<Posts />} />
      </Routes>
    </div>
  );
}

export default App;
