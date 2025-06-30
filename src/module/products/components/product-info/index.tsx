import style from "./style.module.css";
import { products } from "../../../../mock/products.mock";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useBasketStore } from "../../../../store/useBasketStore";
export const ProductInfo = () => {
  const addToBasket = useBasketStore((state) => state.addToBasket);
  const [showMessage, setShowMessage] = useState(false);

  const { id } = useParams();

  const colorMap: Record<string, string> = {
    Чорний: "#1A1A1A",
    Сірий: "#D2D4D8",
    Білий: "#FFFFFF",
    Синій: "#4479CC",
    Золотий: "#D7A55B",
  };

  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  const [clicked, setClicked] = useState<
    { type: "color" | "size"; value: string }[]
  >([]);

  if (!product) {
    return <p className={style.notFound}>Інформацію про товар не знайдено</p>;
  }

  const handleColorClick = (color: string) => {
    setClicked((prev) => {
      const isActive = getActiveValue("color") === color;
      return isActive
        ? prev.filter((c) => c.type !== "color")
        : [
            ...prev.filter((c) => c.type !== "color"),
            { type: "color", value: color },
          ];
    });
  };

  const handleSizeClick = (size: string) => {
    setClicked((prev) => {
      const isActive = getActiveValue("size") === size;
      return isActive
        ? prev.filter((c) => c.type !== "size")
        : [
            ...prev.filter((c) => c.type !== "size"),
            { type: "size", value: size },
          ];
    });
  };

  const getActiveValue = (type: "color" | "size") =>
    clicked.find((item) => item.type === type)?.value;

  const isReadyToAdd = !!getActiveValue("color") && !!getActiveValue("size");

  const handleAddToBasket = () => {
    const existingItem = useBasketStore
      .getState()
      .items.find((item) => item.id === product.id);

    if (existingItem) {
      setShowMessage(true);
    } else {
      addToBasket({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.imageUrl?.[0],
        color: getActiveValue("color"),
      });
    }
  };

  return (
    <div className={style.productInfoContent}>
      <p className={style.productTitle}>{product.title}</p>
      <p className={style.productPrice}>{product.price} UAH</p>

      <div className={style.productSection}>
        <p className={style.sectionTitleDesk}>Опис</p>
        <p className={style.productDescription}>{product.description}</p>
      </div>

      <div className={style.productSection}>
        <p className={style.sectionTitleColor}>Колір</p>
        <ul className={style.colorList}>
          {product.colors.map((color, index) => (
            <li
              key={index}
              className={`${style.colorItem} ${
                getActiveValue("color") === color ? style.active : ""
              }`}
            >
              <button
                className={style.colorItemBtn}
                onClick={() => handleColorClick(color)}
                disabled={index < 2}
              >
                <span
                  className={style.colorCircle}
                  style={{ backgroundColor: colorMap[color] }}
                />
                <p className={style.colorItemBtnText}>{color}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={style.productSection}>
        <p className={style.sectionTitleSize}>Розмір</p>
        <ul className={style.sizeList}>
          {product.sizes.map((size, index) => (
            <li
              key={index}
              className={`${style.sizeItem} ${
                getActiveValue("size") === size ? style.active : ""
              }`}
            >
              <button
                className={style.sizeItemBtn}
                onClick={() => handleSizeClick(size)}
                disabled={index === 1}
              >
                <p className={style.sizeItemTitle}> {size}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={style.productSection}>
        <p className={style.sectionTitleDetails}>Деталі</p>
        <ul className={style.detailsList}>
          {product.details.map((detail, index) => (
            <li key={index} className={style.detailItem}>
              <p className={style.detailItemText}>{detail.label}:</p>
              <span className={style.detailItemSpan}>{detail.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={style.buttonGroup}>
        <button className={style.backButton} onClick={() => navigate(-1)}>
          Назад
        </button>
        <button
          className={style.cartButton}
          disabled={!isReadyToAdd}
          onClick={handleAddToBasket}
        >
          Додати в кошик
        </button>
      </div>

      {showMessage && (
        <>
          <div className={style.popupOverlay} />
          <div className={style.popupMessage}>
            <p className={style.popupMessageText}>
              Цей продукт вже знаходиться в корзині
            </p>
            <button
              className={style.popupMessageBtn}
              onClick={() => navigate(-1)}
            >
              Закрити
            </button>
          </div>
        </>
      )}
    </div>
  );
};
