import style from "./style.module.css";
import { Sheet } from "react-modal-sheet";
import { useBasketStore } from "../../../../store/useBasketStore";
import minus from "../../../../assets/images/minus.svg";
import plus from "../../../../assets/images/plus.svg";
import closeIcon from "../../../../assets/images/closeIcon.svg";
import arrow from "../../../../assets/images/arrow.svg";

interface BasketPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BasketPage = ({ isOpen, onClose }: BasketPageProps) => {
  const items = useBasketStore((state) => state.items);
  const { addToQuantity, removeToQuantity, removeItem } = useBasketStore();

  const total = items.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 0),
    0
  );

  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <button className={style.basketBtn} onClick={onClose}>
            <img className={style.arrowImg} src={arrow} alt="arrow" />
          </button>

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
                <button className={style.basketItemBtnOrder}>Замовити</button>
              </div>
            </ul>
          )}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};
