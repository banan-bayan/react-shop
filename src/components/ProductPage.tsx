import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../api/productsData";
import ProductColor from "./ProductColor";
import Button from "./UI/Button";
import { useAppDispatch } from "../hooks";
import { addProduct } from "../store/cartSlice";
import { Product, ColorProduct, Size } from "../Types";
import { getSizes } from "../api/productsData";

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams<{ productId: string }>();
  const [slide, setSlide] = useState<number>(1);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [sizes, setSizes] = useState<Size[]>([]);
  
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

  const fetchSizes = async () => {
    try {
      const productSizes = await getSizes();
      setSizes(productSizes);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchProd();
    fetchSizes();
  }, [productId, sizes]);

  const handlerSlide = (slideDirection: string) => {
    if (product?.colors?.length) {
      if (slideDirection === "next") {
        setSlide((prev) => (prev === product.colors.length ? 1 : prev + 1));
      } else {
        setSlide((prev) => (prev === 1 ? product.colors.length : prev - 1));
      }
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
        productName,
      })
    );
  };

  return isLoading ? (
    <div className="product-slider-container">
      <Button
        className="product-slider__button prev"
        handlerClick={() => handlerSlide("prev")}
      >
        &lt;
      </Button>
      <div className="product-slider">
        {product?.colors.map((color) => {
          const { id } = color;
          const prodColorClassName =
            id === slide ? "product-slide__active" : "product-slide";

          return (
            <ProductColor
              sizes={sizes}
              handlerClick={addInCart}
              className={prodColorClassName}
              productId={product.id}
              productColor={color}
              productName={product.name}
              key={id}
            />
          );
        })}
      </div>
      <Button
        className="product-slider__button next"
        handlerClick={() => handlerSlide("next")}
      >
        &gt;
      </Button>
    </div>
  ) : (
    <div className="loader">Загрузка товара</div>
  );
};

export default ProductPage;
