import Button from "./UI/Button";
import { Product } from "../Types";
import { Link } from "react-router-dom";
interface ProductItem {
  product?: Product;
}

const ProductItem = ({ product}: ProductItem) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product?.id}`}>
        <Button className="product-item">
          <img
            src={product?.colors[0].images[0]}
            className="product-card__img"
          />
          <div className="product-name">{product?.name}</div>
        </Button>
      </Link>
    </div>
  );
};

export default ProductItem;
