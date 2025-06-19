import { ProductsList } from "../components/product-list/products-list";
import { products } from "../../../mock/products.mock";
export const ProductPage = () => {
  return <ProductsList data={products} />;
};
