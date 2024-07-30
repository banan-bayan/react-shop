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

  return (
    <div className="app">
      <Header cartProductsCount={cartProducts.length} />
      <Routes>
        <Route path="/" element={<ProductListPage products={products} />} />
        <Route path="/product/:productId" element={<ProductPage />} />
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
