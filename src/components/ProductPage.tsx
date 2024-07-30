import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../api/productsData";
import ProductColor from "./ProductColor";
import Button from "./UI/Button";
import { useAppDispatch } from "../hooks";
import { addProduct } from "../store/cartSlice";
import { Product, ColorProduct, Size } from "../Types";
interface ProductPageProps {
  handlerClick: (product: Product | undefined, direction: string) => void;
  slideNumber: number;
}
const ProductPage = ({ handlerClick, slideNumber }: ProductPageProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product>();

  const fetchProd = async () => {
    try {
      if (productId) {
        const fetchedProduct = await getProduct(Number(productId));
        setProduct(fetchedProduct);
        setIsLoading(true);
      }
    } catch (e) {
      setIsLoading(true);
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchProd();
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

  return isLoading ? (
    <div>
      <h2 className="product-name">{product?.name}</h2>

      <div className="product-container">
        <div className="product-color-container">
          <Button
            className="button-slider-left"
            handlerClick={() => handlerClick(product, "prev")}
          >
            &lt;
          </Button>
          {product?.colors.map((color) => {
            const { id } = color;
            const prodColorClassName =
              id === slideNumber ? "product-color__active" : "product-color";

            return (
              <ProductColor
                handlerClick={addInCart}
                className={prodColorClassName}
                productId={product.id}
                productColor={color}
                key={id}
              />
            );
          })}
          <Button
            handlerClick={() => handlerClick(product, "next")}
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
