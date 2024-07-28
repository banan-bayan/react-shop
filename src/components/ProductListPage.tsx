import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
import { getProducts, getSizes } from "../api/productsData";
import { Product, Size } from "../Types";
import { useAppDispatch } from "../hooks";
import { addSizes } from '../store/sizesSlice';
import { addProducts } from "../store/productsSlice";

const ProductList = () => {
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<Product[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  dispatch(addSizes(sizes))
  dispatch(addProducts(products))
  
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      console.warn(e);
    }
  };

  const fetchSizes = async () => {
    try {
      const data = await getSizes();
      setSizes(data);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSizes();
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