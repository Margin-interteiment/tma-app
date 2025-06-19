import styles from "./styles.products-list.module.css";
import { products } from "../../../../mock/products.mock";

export const ProductsList = () => {
  return (
    <div>
      <ul className={styles.listProduct}>
        {products.map((item, id) => (
          <li key={item.id} className={styles.itemProduct}>
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
    </div>
  );
};
