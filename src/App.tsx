import './App.css'
import { Route, Routes } from "react-router-dom";
import CartPage from "./components/CartPage";
import ProductListPage from "./components/ProductListPage";
import ProductPage from "./components/ProductPage";
import Header from './components/Header';

const App = () => {

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<h1>Page not fount</h1>} />
      </Routes>
    </div>
  )
}

export default App
