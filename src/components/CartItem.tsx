import Button from "./UI/Button";
import { ColorProduct, Size } from "../Types";
interface CartProduct {
  cartId: string;
  chooseSize: Size;
  productColor: ColorProduct;
  productId: number;
}
interface CartItem {
  cartProduct: CartProduct;
  productName: string | null;
  handlerClick: (cartId: string) => void;
}
const CartItem = ({ cartProduct, handlerClick, productName }: CartItem) => {
  const {
    chooseSize: { label },
    productColor: { price, name, images },
    cartId,
  } = cartProduct;
  // product-cart-item
  return (
    <>
      <div className="product-cart-item"> 
        <img className="product-card__img" src={images[0]} />
        <h3 className="product__name">{productName}</h3>
        <p>цвет: {name}</p>
        <p>цена: {price}</p>
        <p>размер: {label}</p>
        <Button className='product-cart__button' handlerClick={() => handlerClick(cartId)}>удалить</Button>
      </div>
    </>
  );
};

export default CartItem;
