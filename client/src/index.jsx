import React from "react";
import {createRoot} from "react-dom/client"

const appRoot = document.getElementById("app")

const root = createRoot(appRoot)

root.render(<p>hello world</p>)