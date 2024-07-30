import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../api/productsData";
import ProductColor from "./ProductColor";
import Button from "./UI/Button";
import { useAppDispatch } from "../hooks";
import { addProduct } from "../store/cartSlice";
import { Product, ColorProduct, Size } from "../Types";

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams<{ productId: string }>();
  const [slide, setSlide] = useState<number>(1);
  const [product, setProduct] = useState<Product | undefined>(undefined);

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

  const pervSlide = () => {
    if (product?.colors?.length) {
      setSlide((prev) => (prev === 1 ? product.colors.length : prev - 1));
    }
  };

  const nextSlide = () => {
    if (product?.colors?.length) {
      setSlide((prev) => (prev === product.colors.length ? 1 : prev + 1));
    }
  };

  const addInCart = (
    cartId: string,
    productId: number,
    productColor: ColorProduct,
    chooseSize: Size,
    productName: string

  ) => {
    dispatch(
      addProduct({
        productId,
        cartId,
        productColor,
        chooseSize,
        productName
      })
    );
  };

  return isLoading ? (
    <div>
      <h2 className="product-name">{product?.name}</h2>

      <div className="product-container">
        <div className="product-color-container">
          <Button className="button-slider-left" handlerClick={pervSlide}>
            &lt;
          </Button>
          {product?.colors.map((color) => {
            const { id } = color;
            const prodColorClassName =
              id === slide ? "product-color__active" : "product-color";

            return (
              <ProductColor
                handlerClick={addInCart}
                className={prodColorClassName}
                productId={product.id}
                productColor={color}
                productName={product.name}
                key={id}
              />
            );
          })}
          <Button className="button-slider-right" handlerClick={nextSlide}>
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
