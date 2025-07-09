import style from "./style.module.css";
import { Sheet } from "react-modal-sheet";
import { useBasketStore } from "../../../../store/useBasketStore";
import minus from "../../../../assets/images/minus.svg";
import plus from "../../../../assets/images/plus.svg";
import closeIcon from "../../../../assets/images/closeIcon.svg";
import { useState } from "react";
import { useBackButton, usePopup } from "@tma.js/sdk-react";
import { useEffect } from "react";

interface BasketPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BasketPage = ({ isOpen, onClose }: BasketPageProps) => {
  const items = useBasketStore((state) => state.items);
  const { addToQuantity, removeToQuantity, removeItem } = useBasketStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const popup = usePopup();

  const total = items.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 0),
    0
  );

  const backButton = useBackButton();

  useEffect(() => {
    if (isOpen) {
      backButton.show();

      const handleBack = () => {
        onClose();
      };

      backButton.on("click", handleBack);

      return () => {
        backButton.hide();
        backButton.off("click", handleBack);
      };
    }
  }, [isOpen, backButton, onClose]);

  const closePopup = () => {
    setIsPopupOpen(false);
    window.location.href = "/";
  };

  const handleClick = async () => {
    if (isOrdering) return;
    setIsOrdering(true);

    try {
      if (popup) {
        await popup.open({
          message: "Замовлення успішно оформлене.",
          buttons: [
            {
              id: "ok",
              type: "default",
              text: "Закрити",
            },
          ],
        });
      } else {
        const tgWebApp = (window as any)?.Telegram?.WebApp;
        if (tgWebApp?.showAlert) {
          tgWebApp.showAlert("Замовлення успішно оформлене.");
        } else {
          alert("Замовлення успішно оформлене.");
        }
      }
    } catch (error) {
      console.error("Error showing popup:", error);
    }

    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  return (
    <>
      <Sheet isOpen={isOpen} onClose={onClose}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            {items.length === 0 ? (
              <div className={style.emptyBasketContent}>
                <p className={style.emptyBasket}>Кошик порожній</p>
              </div>
            ) : (
              <ul className={style.basketList}>
                {items.map((item) => (
                  <li key={item.id} className={style.basketItem}>
                    <div className={style.basketItemContent}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={style.basketItemImage}
                      />

                      <div className={style.basketItemOrder}>
                        <div className={style.basketItemInfo}>
                          <p className={style.basketItemName}>{item.name}</p>
                          {item.color && (
                            <p className={style.basketItemColor}>
                              Колір:
                              <span className={style.basketItemColorSpan}>
                                {item.color}
                              </span>
                            </p>
                          )}

                          <p className={style.basketItemPrice}>
                            {item.price} UAH
                          </p>
                        </div>

                        <div className={style.basketItemMakePrice}>
                          <button
                            className={style.basketItemMinus}
                            onClick={() => removeToQuantity(Number(item.id))}
                          >
                            <img
                              className={style.imgOfMinus}
                              src={minus}
                              alt="minus"
                            />
                          </button>
                          <p className={style.basketItemQuantity}>
                            {item.quantity}
                          </p>
                          <button
                            className={style.basketItemPlus}
                            onClick={() => addToQuantity(Number(item.id))}
                          >
                            <img
                              className={style.imgOfPlus}
                              src={plus}
                              alt="plus"
                            />
                          </button>
                        </div>
                      </div>

                      <div className={style.basketItemClose}>
                        <button
                          className={style.basketItemCloseBtn}
                          onClick={() => removeItem(item.id)}
                        >
                          <img
                            className={style.basketItemCloseImg}
                            src={closeIcon}
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}

                <div className={style.basketItemPay}>
                  <p className={style.basketItemPayTitle}>
                    До сплати:
                    <span className={style.basketItemPaySpan}>{total} UAH</span>
                  </p>
                </div>

                <div className={style.basketItemBtn}>
                  <button className={style.basketItemBtnPrev} onClick={onClose}>
                    Назад
                  </button>
                  <button
                    className={style.basketItemBtnOrder}
                    onClick={handleClick}
                  >
                    Замовити
                  </button>
                </div>
              </ul>
            )}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};
