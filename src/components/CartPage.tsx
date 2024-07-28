import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteProduct } from "../store/cartSlice";
import CartItem from "./CartItem";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const deleteProd = (cartId: string) => {
    dispatch(deleteProduct({ cartId }));
  };

  const cart = useAppSelector((state) => state.cart);
  const sis = useAppSelector(state => state.sizes)
  console.log(sis, 'siz')
  const products = useAppSelector((state) => state.products);
  return cart?.length ? (
    <>
      <div className="product-cart">
        {cart.map((cartProduct, index) => {
          const { name } = products.find(
            ({ id }) => id === cartProduct.productId
          );
          if (!name) return null;
          return (
            <CartItem
              key={index}
              cartProduct={cartProduct}
              handlerClick={deleteProd}
              productName={name}
            />
          );
        })}
      </div>
    </>
  ) : (
    <div>Отсутствуют товары в корзине</div>
  );
};

export default CartPage;
