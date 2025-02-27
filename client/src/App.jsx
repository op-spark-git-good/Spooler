import React from "react";
import {Routes, Route} from "react-router-dom";
import Fabrics from "./Fabrics.jsx"

function App(){
  return (
    <Routes>
      {/*<Route path="/" element={}/>*/}
      <Route path="/fabrics"  element={<Fabrics />} />
    </Routes>
  )
}

export default App;