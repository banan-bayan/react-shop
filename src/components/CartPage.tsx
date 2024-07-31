import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteProduct } from "../store/cartSlice";
import CartItem from "./CartItem";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart);

  const deleteProd = (cartId: string) => {
    dispatch(deleteProduct({ cartId }));
  };

  return cartProducts.length ? (
    <div>
      <div className="cart-container">
        {cartProducts.map((cartProduct) => (
          <CartItem
            key={cartProduct.cartId}
            cartProduct={cartProduct}
            handlerClick={deleteProd}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="cart-container__empty-cart">
      отсутствуют товары в корзине
    </div>
  );
};

export default CartPage;
