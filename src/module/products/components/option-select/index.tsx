import style from "./style.module.css";
import { Category, Size, Brands } from "../../typing/enums";
import checkIcon from "../../../../assets/images/check.svg";

type OptionSelectProps = {
  onFilterChange: (filters: {
    categories: string[];
    sizes: string[];
    brands: string[];
  }) => void;
  selectedCategories: string[];
  selectedSizes: string[];
  selectedBrands: string[];
};

export const OptionSelect = ({
  onFilterChange,
  selectedCategories,
  selectedSizes,
  selectedBrands,
}: OptionSelectProps) => {
  const toggleSelection = (
    value: string,
    selectedList: string[],
    onChange: (newSelected: string[]) => void
  ) => {
    const newSelection = selectedList.includes(value)
      ? selectedList.filter((v) => v !== value)
      : [...selectedList, value];
    onChange(newSelection);
  };

  return (
    <>
      <div className={style.optionCategory}>
        <p className={style.optionCategoryTitle}>Категорія</p>
        <ul className={style.optionCategoryList}>
          {Object.values(Category).map((category) => (
            <li key={category} className={style.optionCategoryItem}>
              <label
                className={`${style.optionCategoryBtn} ${
                  selectedCategories.includes(category) ? style.active : ""
                }`}
              >
                <input
                  type="checkbox"
                  value={category}
                  hidden
                  checked={selectedCategories.includes(category)}
                  onChange={() =>
                    toggleSelection(
                      category,
                      selectedCategories,
                      (newSelected) =>
                        onFilterChange({
                          categories: newSelected,
                          sizes: selectedSizes,
                          brands: selectedBrands,
                        })
                    )
                  }
                />
                <span
                  className={`${style.checkmark} ${
                    selectedCategories.includes(category) ? style.active : ""
                  }`}
                  style={{
                    backgroundImage: `url(${checkIcon})`,
                    backgroundPosition: "2px 2px",
                  }}
                />
                <span className={style.labelText}>{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className={style.optionSize}>
        <p className={style.optionSizeTitle}>Розмір</p>
        <ul className={style.optionSizeList}>
          {Object.values(Size).map((size) => (
            <li key={size} className={style.optionSizeItem}>
              <label
                className={`${style.optionSizeBtn} ${
                  selectedSizes.includes(size) ? style.active : ""
                }`}
              >
                <input
                  type="checkbox"
                  value={size}
                  hidden
                  checked={selectedSizes.includes(size)}
                  onChange={() =>
                    toggleSelection(size, selectedSizes, (newSelected) =>
                      onFilterChange({
                        categories: selectedCategories,
                        sizes: newSelected,
                        brands: selectedBrands,
                      })
                    )
                  }
                />
                <span
                  className={`${style.checkmark} ${
                    selectedSizes.includes(size) ? style.active : ""
                  }`}
                  style={{
                    backgroundImage: `url(${checkIcon})`,
                    backgroundPosition: "2px 2px",
                  }}
                />
                <span className={style.labelText}>{size}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className={style.optionBrand}>
        <p className={style.optionBrandTitle}>Бренд</p>
        <ul className={style.optionBrandList}>
          {Object.values(Brands).map((brand) => (
            <li key={brand} className={style.optionBrandItem}>
              <label
                className={`${style.optionBrandBtn} ${
                  selectedBrands.includes(brand) ? style.active : ""
                }`}
              >
                <input
                  type="checkbox"
                  value={brand}
                  hidden
                  checked={selectedBrands.includes(brand)}
                  onChange={() =>
                    toggleSelection(brand, selectedBrands, (newSelected) =>
                      onFilterChange({
                        categories: selectedCategories,
                        sizes: selectedSizes,
                        brands: newSelected,
                      })
                    )
                  }
                />
                <span
                  className={`${style.checkmark} ${
                    selectedBrands.includes(brand) ? style.active : ""
                  }`}
                  style={{
                    backgroundImage: `url(${checkIcon})`,
                    backgroundPosition: "2px 2px",
                  }}
                />
                <span className={style.labelText}>{brand}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
