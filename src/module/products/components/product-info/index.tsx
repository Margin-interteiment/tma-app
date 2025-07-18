import style from "./style.module.css";
import { products } from "../../../../mock/products.mock";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useBasketStore } from "../../../../store/useBasketStore";
import { useBackButton, usePopup } from "@tma.js/sdk-react";

export const ProductInfo = () => {
  const addToBasket = useBasketStore((state) => state.addToBasket);
  const backButton = useBackButton();
  const popup = usePopup();
  const navigate = useNavigate();
  const [isComponentReady, setIsComponentReady] = useState(false);

  useEffect(() => {
    setIsComponentReady(true);

    backButton.show();

    const onBack = () => {
      navigate(-1);
    };

    backButton.on("click", onBack);

    return () => {
      backButton.hide();
      backButton.off("click", onBack);
    };
  }, [backButton, navigate]);

  const { id } = useParams();

  const colorMap: Record<string, string> = {
    Чорний: "#1A1A1A",
    Сірий: "#D2D4D8",
    Білий: "#FFFFFF",
    Синій: "#4479CC",
    Золотий: "#D7A55B",
  };

  const product = useMemo(() => {
    return products.find((p) => p.id === Number(id));
  }, [id]);

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

  const handleAddToBasket = async () => {
    const existingItem = useBasketStore
      .getState()
      .items.find((item) => item.id === product.id);

    if (existingItem) {
      try {
        if (popup) {
          await popup.open({
            message: "Цей продукт вже знаходиться в корзині.",
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
            tgWebApp.showAlert("Цей продукт вже знаходиться в корзині.");
          } else {
            alert("Цей продукт вже знаходиться в корзині.");
          }
        }
      } catch (error) {
        console.error("Error showing popup:", error);
      }
      return;
    }

    addToBasket({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.imageUrl?.[0],
      color: getActiveValue("color"),
    });

    navigate("/");
  };

  return (
    <div className={style.productInfoContent}>
      <p className={style.productTitle}>{product.title}</p>
      <div className={style.productPriceContent}>
        <p className={style.productPrice}>{product.price} UAH</p>
      </div>

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
              } ${!isComponentReady ? style.loading : ""}`}
            >
              <button
                className={`${style.colorItemBtn} ${
                  !isComponentReady ? style.btnLoading : ""
                }`}
                onClick={() => handleColorClick(color)}
                disabled={index > 2 || !isComponentReady}
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
              } ${!isComponentReady ? style.loading : ""}`}
            >
              <button
                className={`${style.sizeItemBtn} ${
                  !isComponentReady ? style.btnLoading : ""
                }`}
                onClick={() => handleSizeClick(size)}
                disabled={index > 1 || !isComponentReady}
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

      <div className={style.buttonGroupBottom}></div>
      <div className={style.buttonGroup}>
        <button
          className={`${style.backButton} ${
            !isComponentReady ? style.btnLoading : ""
          }`}
          onClick={() => navigate(-1)}
          disabled={!isComponentReady}
        >
          Назад
        </button>
        <button
          className={`${style.cartButton} ${
            !isComponentReady ? style.btnLoading : ""
          }`}
          disabled={!isReadyToAdd || !isComponentReady}
          onClick={handleAddToBasket}
        >
          Додати в кошик
        </button>
      </div>
    </div>
  );
};
