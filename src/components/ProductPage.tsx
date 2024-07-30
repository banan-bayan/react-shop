import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ProductColor from "./ProductColor";
import Button from "./UI/Button";
import { useAppDispatch } from "../hooks";
import { addProduct } from "../store/cartSlice";
import { Product, ColorProduct, Size } from "../Types";
interface ProductPageProps {
  handlerClick: (product: Product | undefined, direction: string) => void;
  slideNumber: number;
  fetchProduct: (prodId: number) => void;
  isLoadingProduct: boolean;
  productColor?: Product
}
const ProductPage = ({
  productColor, 
  isLoadingProduct,
  handlerClick,
  slideNumber,
  fetchProduct,
}: ProductPageProps) => {
  const dispatch = useAppDispatch();
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    fetchProduct(Number(productId));
  }, [productId]);

  const addInCart = (
    cartId: string,
    productId: number,
    productColor: ColorProduct,
    chooseSize: Size
  ) => {
    dispatch(
      addProduct({
        productId,
        cartId,
        productColor,
        chooseSize,
      })
    );
  };

  return isLoadingProduct ? (
    <div>
      <h2 className="product-name">{productColor?.name}</h2>

      <div className="product-container">
        <div className="product-color-container">
          <Button
            className="button-slider-left"
            handlerClick={() => handlerClick(productColor, "prev")}
          >
            &lt;
          </Button>
          {productColor?.colors.map((color) => {
            const { id } = color;
            const prodColorClassName =
              id === slideNumber ? "product-color__active" : "product-color";

            return (
              <ProductColor
                handlerClick={addInCart}
                className={prodColorClassName}
                productId={productColor.id}
                productColor={color}
                key={id}
              />
            );
          })}
          <Button
            handlerClick={() => handlerClick(productColor, "next")}
            className="button-slider-right"
          >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <h1>Загрузка товара</h1>
  );
};

export default ProductPage;
