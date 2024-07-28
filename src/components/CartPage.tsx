import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteProduct } from "../store/cartSlice";
import CartItem from "./CartItem";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const deleteProd = (cartId: string) => {
    dispatch(deleteProduct({ cartId }));
  };

  const cart = useAppSelector((state) => state.cart);
  const products = useAppSelector((state) => state.products);
 
  return cart?.length ? (
    <>
      <div className="product-cart">
        {cart.map((cartProduct, index) => {
          const product = products.find(
            ({ id }) => id === cartProduct.productId
          );
          if (!product?.name) return null;
          return (
            <CartItem
              key={index}
              cartProduct={cartProduct}
              handlerClick={deleteProd}
              productName={product.name}
            />
          );
        })}
      </div>
    </>
  ) : (
    <h1>Отсутствуют товары в корзине</h1>
  );
};

export default CartPage;
