import React from "react";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const appRoot = document.getElementById("app");

const root = createRoot(appRoot);

root.render(
  <BrowserRouter>
   <App />
  </BrowserRouter>


);
