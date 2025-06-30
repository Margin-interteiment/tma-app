import style from "./style.module.css";
import { useEffect, useState } from "react";
import { products } from "../../../../mock/products.mock";
import { useNavigate } from "react-router-dom";
import closeIcon from "../../../../assets/images/closeIcon.svg";

export const ProductBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const changeProductIntervalOfMinute = setInterval(() => {
      setCurrentIndex((prevItem) => (prevItem + 1) % products.length);
    }, 60 * 1000);
    return () => {
      clearInterval(changeProductIntervalOfMinute);
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isVisible) {
      timer = setTimeout(() => {
        setIsVisible(true);
      }, 2 * 60 * 1000);
    } else {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 60 * 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isVisible]);

  if (!isVisible || products.length == 0) return null;
  const product = products[currentIndex];

  return (
    <div className={style.productBanner}>
      <div className={style.productBannerContent}>
        <button
          className={style.productBannerContentCloseBtn}
          onClick={() => setIsVisible(false)}
        >
          <img
            className={style.closeIconForBanner}
            src={closeIcon}
            alt="close icon"
          />
        </button>
        <p className={style.productBannerContentTitle}>{product.title}</p>
        <p className={style.productBannerContentPrice}>{product.price} UAH</p>
        <img
          className={style.productBannerImg}
          src={product.imageUrl[0]}
          alt={product.imageUrl[0]}
        />
        <button
          className={style.productBannerContentBtn}
          onClick={() => navigate(`/product/${product.id}`)}
        >
          Купити
        </button>
      </div>
    </div>
  );
};
