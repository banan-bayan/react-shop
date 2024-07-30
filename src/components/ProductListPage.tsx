import ProductItem from "./ProductItem";
import { Product } from "../Types";
interface ProductsListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductsListProps) => {
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
