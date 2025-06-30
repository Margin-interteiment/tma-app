import { useState } from "react";
import style from "./style.module.css";
import { BasketPage } from "../../pages/basket-page";
import bag from "../../../../assets/images/shopping-bag.svg";
import { useBasketStore } from "../../../../store/useBasketStore";

export const BasketButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const items = useBasketStore((state) => state.items);
  const totalCount = items.reduce((sum, item) => sum + (item.quantity ?? 0), 0);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className={style.basketBtnContent}>
        <button className={style.basketBtn} onClick={handleClick}>
          <img src={bag} />
          {totalCount > 0 && (
            <span className={style.basketBadge}>{totalCount}</span>
          )}
        </button>
      </div>

      {isOpen && (
        <BasketPage isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};
