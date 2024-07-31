import Button from "./UI/Button";
import { CartItemInterface } from "../Types";

interface CartItemProps {
  cartProduct: CartItemInterface;
  handlerClick: (cartId: string) => void;
}
const CartItem = ({ cartProduct, handlerClick }: CartItemProps) => {
  const {
    chooseSize: { label },
    productColor: { price, name, images },
    cartId,
    productName,
  } = cartProduct;

  return (
    <>
      <div className="cart-item">
        <img className="cart-item__img" src={images[0]} />
        <div className="cart-item__info">
          <h2 className="cart-item__name">{productName}</h2>

          <div className="cart-item__color">цвет: {name}</div>
          <div className="cart-item__price">цена: {price}</div>
          <div className="cart-item__size">размер: {label}</div>
          <Button
            className="cart-item__delete-cart-button"
            handlerClick={() => handlerClick(cartId)}
          >
            удалить
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
