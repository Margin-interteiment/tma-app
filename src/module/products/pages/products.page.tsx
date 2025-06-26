import { useState } from "react";
import { ProductsList } from "../components/product-list/products-list";
import { products } from "../../../mock/products.mock";
import { ProductsCategory } from "../components/products-category";
import { Category } from "../typing/enums";
import { ProductButtons } from "../components/product-buttons";
import { FilterProduct } from "../components/filter-product/filter-product";

export const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [filters, setFilters] = useState({
    categories: [] as string[],
    sizes: [] as string[],
    brands: [] as string[],
    colors: [] as string[],
  });
  const [isFilterOpen, setFilterOpen] = useState(false);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== null) {
      if (p.category !== selectedCategory) return false;
    } else if (
      filters.categories.length > 0 &&
      !filters.categories.includes(p.category)
    ) {
      return false;
    }

    if (
      filters.sizes.length > 0 &&
      !filters.sizes.includes(p.size.toString())
    ) {
      return false;
    }

    if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) {
      return false;
    }

    if (
      filters.colors.length > 0 &&
      !filters.colors.includes(p.color.toString())
    ) {
      return false;
    }

    return true;
  });

  return (
    <>
      <ProductButtons
        onClickFilter={() => setFilterOpen(true)}
        hasActiveFilters={
          filters.categories.length > 0 ||
          filters.sizes.length > 0 ||
          filters.brands.length > 0 ||
          filters.colors.length > 0
        }
      />
      <ProductsCategory
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <ProductsList data={filteredProducts} />
      <FilterProduct
        isOpen={isFilterOpen}
        setOpen={setFilterOpen}
        filters={filters}
        setFilters={setFilters}
      />
    </>
  );
};
