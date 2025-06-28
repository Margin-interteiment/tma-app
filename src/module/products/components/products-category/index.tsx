import style from "./styles.module.css";
import { Category } from "../../typing/enums";

type ProductsCategoryProps = {
  selected: string | null;
  onSelect: (category: Category | null) => void;
};

export const ProductsCategory = ({
  selected,
  onSelect,
}: ProductsCategoryProps) => {
  return (
    <ul className={style.listCategory}>
      {Object.values(Category).map((item, id) => {
        const isActive = selected === item || (selected === null && id === 0);
        return (
          <li key={id} className={style.itemCategory}>
            <button
              className={`${style.categoryBtn} ${
                isActive ? style.categoryBtnActive : ""
              }`}
              onClick={() => onSelect(id === 0 ? null : item)}
            >
              {item}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
