import { Route, Routes } from "react-router-dom";
import { ProductRoute } from "../product/routes/ProductRoute";

import { HomePage } from "../home/pages/HomePage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/*" element={<ProductRoute />} />
    </Routes>
  );
};
