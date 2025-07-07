import style from "./styles.module.css";
import filterIcon from "../../../../assets/images/filter-icon.svg";
import userIcon from "../../../../assets/images/user-icon.svg";
import activeBadge from "../../../../assets/images/markOfFilter.svg";

type ProductButtonsProps = {
  onClickFilter: () => void;
  hasActiveFilters?: boolean;
};

export const ProductButtons = ({
  onClickFilter,
  hasActiveFilters = false,
}: ProductButtonsProps) => {
  return (
    <ul className={style.productButtonsList}>
      <li className={style.productButtonsItem}>
        <button
          className={style.productButtonsItemButtonFilter}
          onClick={onClickFilter}
        >
          <img src={filterIcon} className={style.productButtonsImgFilter} />

          {hasActiveFilters && (
            <img
              src={activeBadge}
              className={style.filterActiveBadge}
              alt="active"
            />
          )}
        </button>
      </li>
      <li className={style.productButtonsItem}>
        <button className={style.productButtonsItemButton}>
          <img src={userIcon} className={style.productButtonsImgUser} />
        </button>
      </li>
    </ul>
  );
};
