import { ProductsList } from "../components/product-list/products-list";
import { products } from "../../../mock/products.mock";
import { ProductsCategory } from "../components/products-category/products-category";
import { Category } from "../typing/enums";
import { useState } from "react";
import { ProductButtons } from "../components/product-buttons/product-buttons";

export const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const filteredProducts =
    selectedCategory === null
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      <ProductButtons />
      <ProductsCategory
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <ProductsList data={filteredProducts} />
    </>
  );
};
