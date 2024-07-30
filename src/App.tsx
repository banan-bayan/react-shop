import "./App.css";
import { Route, Routes } from "react-router-dom";
import CartPage from "./components/CartPage";
import ProductListPage from "./components/ProductListPage";
import ProductPage from "./components/ProductPage";
import Header from "./components/Header";
import { useAppSelector } from "./hooks";

const App = () => {
  const cartProducts = useAppSelector((state) => state.cart);

  return (
    <div className="app">
      <Header cartProductsCount={cartProducts.length} />
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<h1>Страница не найдена</h1>} />
      </Routes>
    </div>
  );
};

export default App;
