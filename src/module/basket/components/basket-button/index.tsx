import { useState } from "react";
import style from "./style.module.css";
import { BasketPage } from "../../pages/basket-page";
import bag from "../../../../assets/images/shopping-bag.svg";

export const BasketButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className={style.basketBtnContent}>
        <button className={style.basketBtn} onClick={handleClick}>
          <img src={bag} />
        </button>
      </div>

      {isOpen && (
        <BasketPage isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};
