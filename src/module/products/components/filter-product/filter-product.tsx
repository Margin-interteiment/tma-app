import { Sheet } from "react-modal-sheet";
import { OptionColor } from "../option-color";
import { OptionSelect } from "../option-select";
import style from "./styles.module.css";
import { useBackButton } from "@tma.js/sdk-react";
import { useEffect } from "react";
type FilterProductProps = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  filters: {
    categories: string[];
    sizes: string[];
    brands: string[];
    colors: string[];
  };
  setFilters: (filters: {
    categories: string[];
    sizes: string[];
    brands: string[];
    colors: string[];
  }) => void;
};

export const FilterProduct = ({
  isOpen,
  setOpen,
  filters,
  setFilters,
}: FilterProductProps) => {
  const backButton = useBackButton();

  useEffect(() => {
    if (isOpen) {
      backButton.show();

      const handleBack = () => {
        setOpen(false);
      };

      backButton.on("click", handleBack);

      return () => {
        backButton.hide();
        backButton.off("click", handleBack);
      };
    }
  }, [isOpen]);

  const handleApplyFilters = () => {
    setOpen(false);
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.brands.length > 0 ||
    filters.colors.length > 0;

  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content className={style.filterScroll}>
          <p className={style.filterTitle}>Фільтри</p>

          <OptionSelect
            selectedCategories={filters.categories}
            selectedSizes={filters.sizes}
            selectedBrands={filters.brands}
            onFilterChange={(newFilters) =>
              setFilters({ ...filters, ...newFilters })
            }
          />
          <OptionColor
            selectedColors={filters.colors}
            onColorChange={(colors) => setFilters({ ...filters, colors })}
          />

          <div className={style.filterButtons}>
            <div className={style.filterContent}>
              <button
                onClick={() => setOpen(false)}
                className={style.filterPrev}
              >
                Назад
              </button>
            </div>
            <div className={style.filterContentBtn}>
              <button
                onClick={handleApplyFilters}
                className={style.filterButton}
                disabled={!hasActiveFilters}
              >
                Застосувати
              </button>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};
