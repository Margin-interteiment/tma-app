import { useState } from "react";
import { ProductsList } from "../components/product-list/products-list";
import { products } from "../../../mock/products.mock";
import { ProductsCategory } from "../components/products-category";
import { ProductButtons } from "../components/product-buttons";
import { FilterProduct } from "../components/filter-product/filter-product";
import { BasketButton } from "../../basket/components/basket-button";

export const ProductPage = () => {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    sizes: [] as string[],
    brands: [] as string[],
    colors: [] as string[],
  });
  const [isFilterOpen, setFilterOpen] = useState(false);

  const filteredProducts = products.filter((p) => {
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(p.category)
    ) {
      return false;
    }

    if (
      filters.sizes.length > 0 &&
      !filters.sizes.includes(p.sizes.toString())
    ) {
      return false;
    }

    if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) {
      return false;
    }

    if (
      filters.colors.length > 0 &&
      !filters.colors.includes(p.colors.toString())
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
        selected={filters.categories[0] ?? null}
        onSelect={(category) =>
          setFilters({
            ...filters,
            categories: category ? [category] : [],
          })
        }
      />

      <ProductsList data={filteredProducts} />
      <FilterProduct
        isOpen={isFilterOpen}
        setOpen={setFilterOpen}
        filters={filters}
        setFilters={setFilters}
      />

      <BasketButton />
    </>
  );
};
