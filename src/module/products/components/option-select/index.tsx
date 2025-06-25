import style from "./style.module.css";
import { Category, Size, Brands } from "../../typing/enums";
import checkIcon from "../../../../assets/images/check.svg";
import { useState } from "react";

export const OptionSelect = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const toggleSelection = (
    value: string,
    selectedList: string[],
    setSelected: (values: string[]) => void
  ) => {
    setSelected(
      selectedList.includes(value)
        ? selectedList.filter((v) => v !== value)
        : [...selectedList, value]
    );
  };

  const isSelected = (value: string, selectedList: string[]) =>
    selectedList.includes(value);

  return (
    <div className={style.mainOption}>
      <div className={style.optionCategory}>
        <p className={style.optionCategoryTitle}>Категорія</p>
        <ul className={style.optionCategoryList}>
          {Object.values(Category).map((category) => (
            <li key={category} className={style.optionCategoryItem}>
              <label className={style.optionCategoryBtn}>
                <input
                  type="checkbox"
                  value={category}
                  className={style.optionCategoryCheckbox}
                  hidden
                  checked={isSelected(category, selectedCategories)}
                  onChange={() =>
                    toggleSelection(
                      category,
                      selectedCategories,
                      setSelectedCategories
                    )
                  }
                />
                <span
                  className={`${style.checkmark} ${
                    isSelected(category, selectedCategories) ? style.active : ""
                  }`}
                  style={{
                    backgroundImage: `url(${checkIcon})`,
                    backgroundPosition: "2px 2px",
                  }}
                ></span>
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
              <label className={style.optionSizeBtn}>
                <input
                  type="checkbox"
                  value={size}
                  className={style.optionSizeCheckbox}
                  hidden
                  checked={isSelected(size, selectedSizes)}
                  onChange={() =>
                    toggleSelection(size, selectedSizes, setSelectedSizes)
                  }
                />
                <span
                  className={`${style.checkmark} ${
                    isSelected(size, selectedSizes) ? style.active : ""
                  }`}
                  style={{
                    backgroundImage: `url(${checkIcon})`,
                    backgroundPosition: "2px 2px",
                  }}
                ></span>
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
              <label className={style.optionBrandBtn}>
                <input
                  type="checkbox"
                  value={brand}
                  className={style.optionBrandCheckbox}
                  hidden
                  checked={isSelected(brand, selectedBrands)}
                  onChange={() =>
                    toggleSelection(brand, selectedBrands, setSelectedBrands)
                  }
                />
                <span
                  className={`${style.checkmark} ${
                    isSelected(brand, selectedBrands) ? style.active : ""
                  }`}
                  style={{
                    backgroundImage: `url(${checkIcon})`,
                    backgroundPosition: "2px 2px",
                  }}
                ></span>
                <span className={style.labelText}>{brand}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
