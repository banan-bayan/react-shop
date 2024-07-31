import Button from "./UI/Button";
import { Product } from "../Types";
import { Link } from "react-router-dom";
interface ProductItem {
  product?: Product;
}

const ProductItem = ({ product }: ProductItem) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product?.id}`}>
        <Button className="product-card__button">
          <img
            src={product?.colors[0].images[0]}
            className="product-card__img"
          />
          <div className="product-card__info">
            <div className="product-card__name">{product?.name}</div>
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default ProductItem;
