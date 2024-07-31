import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
import { getProducts } from "../api/productsData";
import { Product } from "../Types";
import { addProducts } from "../store/productsSlice";
import { useAppDispatch } from "../hooks";
const ProductList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<Product[]>([]);
  dispatch(addProducts(products));
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setIsLoading(true);
    } catch (e) {
      console.warn(e);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return isLoading ? ( 
    <div className="products-container">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  ) : (
    <div className="loader">Загрузка товаров</div>
  );
};

export default ProductList;
