import { Link } from "react-router-dom";
import style from "./styles.module.css";
import filterIcon from "../../../../assets/images/filter-icon.svg";
import userIcon from "../../../../assets/images/user-icon.svg";
import { FilterProduct } from "../filter-product/filter-product";
import { useState } from "react";

export const ProductButtons = () => {
  const [isOpen, setOpen] = useState(false);

  const handleFilterClick = () => {
    setOpen(!isOpen);
  };

  return (
    <ul className={style.productButtonsList}>
      <li className={style.productButtonsItem}>
        <button
          className={style.productButtonsItemButton}
          onClick={handleFilterClick}
        >
          <Link to={""} className={style.productButtonsLink}>
            <img src={filterIcon} className={style.productButtonsImgFilter} />
          </Link>
        </button>
        {isOpen && <FilterProduct isOpen={isOpen} setOpen={setOpen} />}
      </li>
      <li className={style.productButtonsItem}>
        <button className={style.productButtonsItemButton}>
          <Link to={""} className={style.productButtonsLink}>
            <img src={userIcon} className={style.productButtonsImgUser} />
          </Link>
        </button>
      </li>
    </ul>
  );
};
