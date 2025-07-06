import { useState } from "react";
import { ProductsList } from "../components/product-list/products-list";
import { products } from "../../../mock/products.mock";
import { ProductsCategory } from "../components/products-category";
import { ProductButtons } from "../components/product-buttons";
import { FilterProduct } from "../components/filter-product/filter-product";
import { BasketButton } from "../../basket/components/basket-button";
import { ProductBanner } from "../components/product-banner";
import { ProductProfile } from "../components/product-profile";

export const ProductPage = () => {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    sizes: [] as string[],
    brands: [] as string[],
    colors: [] as string[],
  });
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
        onClickProfile={() => setIsProfileOpen(true)}
        hasActiveFilters={
          filters.categories.length > 0 ||
          filters.sizes.length > 0 ||
          filters.brands.length > 0 ||
          filters.colors.length > 0
        }
      />

      <ProductBanner />

      <ProductsCategory
        selected={filters.categories[0] ?? null}
        onSelect={(category) =>
          setFilters({
            ...filters,
            categories: category ? [category] : [],
          })
        }
      />

      {filteredProducts.length > 0 ? (
        <ProductsList data={filteredProducts} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
            padding: "0 20px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "18px", maxWidth: "600px" }}>
            Фільтрації за таким запитом не знайдено
          </p>
        </div>
      )}

      <FilterProduct
        isOpen={isFilterOpen}
        setOpen={setFilterOpen}
        filters={filters}
        setFilters={setFilters}
      />

      <ProductProfile
        isOpenProfile={isProfileOpen}
        setOpenProfile={setIsProfileOpen}
      />

      <BasketButton />
    </>
  );
};
