import style from "./style.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { products } from "../../../../mock/products.mock";
import { useParams } from "react-router-dom";

export const ProductSlider = () => {
  const { id } = useParams();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <p>Немає такого товару</p>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...sliderSettings} className={style.sliderContent}>
      {product.imageUrl.map((url, id) => (
        <div key={id} className={style.sliderItem}>
          <img
            src={url}
            alt={`${product.title} ${id + 1}`}
            className={style.sliderImg}
          />
        </div>
      ))}
    </Slider>
  );
};
