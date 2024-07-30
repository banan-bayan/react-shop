import { CartItemInterface, Product } from "../Types";
import CartItem from "./CartItem";

interface CartPageProps {
  cartProducts: CartItemInterface[];
  products: Product[];
  handlerClick: (cartId: string) => void;
}

const CartPage = ({ cartProducts, products, handlerClick }: CartPageProps) => {
  return cartProducts?.length ? (
    <>
      <div className="product-cart">
        {cartProducts.map((cartProduct, index) => {
          const product = products.find(
            ({ id }) => id === cartProduct.productId
          );
          if (!product?.name) return null;
          return (
            <CartItem
              key={index}
              cartProduct={cartProduct}
              handlerClick={handlerClick}
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
