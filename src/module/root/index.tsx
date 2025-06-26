import { Route, Routes } from "react-router-dom";
import { ProductPage } from "../products/pages/products.page";
import { ProductDetailedPage } from "../products/pages/product-detailed.page";

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductPage />} />
      <Route path="/product/:id" element={<ProductDetailedPage />} />
    </Routes>
  );
};
