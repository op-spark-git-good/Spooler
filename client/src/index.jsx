import React from "react";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const appRoot = document.getElementById("app");

const root = createRoot(appRoot);
//styling
document.body.style.backgroundColor = 'rgb(229, 229, 234)';
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.height = '100%';

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>


);
