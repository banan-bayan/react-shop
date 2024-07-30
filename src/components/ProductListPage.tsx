import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
import { getProducts } from "../api/productsData";
import { Product } from "../Types";
import { addProducts } from "../store/productsSlice";
import { useAppDispatch } from "../hooks";
const ProductList = () => {
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<Product[]>([]);
  dispatch(addProducts(products));
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
    <div className="products-container">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
