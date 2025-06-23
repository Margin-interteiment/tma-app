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
    <div className="">
      <ul className={style.productButtonsList}>
        <li className={style.ProductButtonsItem}>
          <button
            className={style.ProductButtonsItemButton}
            onClick={handleFilterClick}
          >
            <Link to={""} className={style.ProductButtonsLink}>
              <img src={filterIcon} className={style.ProductButtonsImgFilter} />
            </Link>
          </button>
          {isOpen && <FilterProduct isOpen={isOpen} setOpen={setOpen} />}
        </li>
        <li className={style.ProductButtonsItem}>
          <button className={style.ProductButtonsItemButton}>
            <Link to={""} className={style.ProductButtonsLink}>
              <img src={userIcon} className={style.ProductButtonsImgUser} />
            </Link>
          </button>
        </li>
      </ul>
    </div>
  );
};
