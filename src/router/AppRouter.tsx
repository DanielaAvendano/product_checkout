import { Route, Routes } from "react-router-dom";
import { HomePage } from "../home/HomePage";
import { ProductRoute } from "../product/routes/ProductRoute";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/*" element={<ProductRoute />} />
    </Routes>
  );
};
