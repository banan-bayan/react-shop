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
    <div className="cart-page">
      <div className="product-cart">
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
    <h1>Отсутствуют товары в корзине</h1>
  );
};

export default CartPage;
