import React from "react";
import ReactDOM from "react-dom/client";

import "./styles.css";
import { ProductApp } from "./ProductApp.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductApp />
    </BrowserRouter>
  </React.StrictMode>
);