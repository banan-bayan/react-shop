import "./App.css";
import { Route, Routes } from "react-router-dom";
import CartPage from "./components/CartPage";
import ProductListPage from "./components/ProductListPage";
import ProductPage from "./components/ProductPage";
import Header from "./components/Header";
import { useAppSelector, useAppDispatch } from "./hooks";
import { deleteProduct } from "./store/cartSlice";
import { useEffect, useState } from "react";
import { getProducts } from "./api/productsData";
import { Product } from "./Types";

const App = () => {
  const [slide, setSlide] = useState<number>(1);

  const [products, setProducts] = useState<Product[]>([]);
  const cartProducts = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const deleteProd = (cartId: string) => {
    dispatch(deleteProduct({ cartId }));
  };

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlerClickSlide = (
    product: Product | undefined,
    direction: string
  ) => {
    if (product?.colors?.length) {
      if (direction === "next") {
        setSlide((prev) => (prev === product.colors.length ? 1 : prev + 1));
      }
      if (direction === "prev") {
        setSlide((prev) => (prev === 1 ? product.colors.length : prev - 1));
      }
    }
  };

  return (
    <div className="app">
      <Header cartProductsCount={cartProducts.length} />
      <Routes>
        <Route path="/" element={<ProductListPage products={products} />} />
        <Route
          path="/product/:productId"
          element={
            <ProductPage handlerClick={handlerClickSlide} slideNumber={slide} />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartProducts={cartProducts}
              products={products}
              handlerClick={deleteProd}
            />
          }
        />
        <Route path="*" element={<h1>Страница не найдена</h1>} />
      </Routes>
    </div>
  );
};

export default App;
