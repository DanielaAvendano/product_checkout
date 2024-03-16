import { Route, Routes } from "react-router-dom";
import { ProductPage } from "../pages/ProductPage";

export const ProductRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductPage />} />
    </Routes>
  );
};
