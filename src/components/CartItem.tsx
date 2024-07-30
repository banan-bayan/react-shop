import Button from "./UI/Button";
import { CartItemInterface } from "../Types";

interface CartItemProps {
  cartProduct: CartItemInterface;
  productName: string | null;
  handlerClick: (cartId: string) => void;
}
const CartItem = ({
  cartProduct,
  handlerClick,
  productName,
}: CartItemProps) => {
  const {
    chooseSize: { label },
    productColor: { price, name, images },
    cartId,
  } = cartProduct;

  return (
    <>
      <div className="product-cart-item">
        <img className="product-card__img" src={images[0]} />
        <h3 className="product-name">{productName}</h3>
        <p>цвет: {name}</p>
        <p>цена: {price}</p>
        <p>размер: {label}</p>
        <Button
          className="product-cart__button"
          handlerClick={() => handlerClick(cartId)}
        >
          удалить
        </Button>
      </div>
    </>
  );
};

export default CartItem;
