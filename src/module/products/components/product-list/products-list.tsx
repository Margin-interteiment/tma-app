import styles from "./styles.module.css";
import { ProductItem } from "../../../products/typing/interfaces";
import { useNavigate } from "react-router-dom";

type ProductListProps = {
  data: ProductItem[];
};

export const ProductsList = ({ data }: ProductListProps) => {
  const navigate = useNavigate();

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <ul className={styles.listProduct}>
      {data.map((item, id) => (
        <li key={id} className={styles.itemProduct}>
          <button
            className={styles.productBtn}
            onClick={() => handleProductClick(item.id)}
          >
            <div className={styles.imgContent}>
              <img
                className={styles.productImg}
                src={item.imageUrl[0]}
                alt="image product item"
              />
            </div>
            <div className={styles.aboutProduct}>
              <p className={styles.titleProduct}>{item.title}</p>
              <p className={styles.priceProduct}>{item.price} UAH</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};
