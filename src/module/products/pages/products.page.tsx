import { ProductsList } from "../components/product-list/products-list";
import { data } from "../../../mock/products.mock";
// import { ProductItem } from "../../products/typing/interfaces";
export const ProductPage = () => {
  return (
    <div>
      <ProductsList data={data} />
    </div>
  );
};
