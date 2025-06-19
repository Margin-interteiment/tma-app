import styles from "./styles.module.css";
import { ProductItem } from "../../../products/typing/interfaces";

type ProductListProps = {
  data: ProductItem[];
};

export const ProductsList = ({ data }: ProductListProps) => {
  return (
    <ul className={styles.listProduct}>
      {data.map((item, id) => (
        <li key={id} className={styles.itemProduct}>
          <button className={styles.productBtn}>
            <div className={styles.imgContent}>
              <img
                className={styles.productImg}
                src={item.imageUrl}
                alt="image product item"
              />
            </div>
            <div className={styles.aboutProduct}>
              <h2 className={styles.titleProduct}>{item.title}</h2>
              <p className={styles.priceProduct}>{item.price} UAH</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};
