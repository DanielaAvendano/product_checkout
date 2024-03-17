import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./styles.css";
import { ProductApp } from "./ProductApp.tsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ProductApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
