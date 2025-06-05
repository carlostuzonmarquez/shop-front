import { useState } from "react";
import { fetchProducts } from "../services/fetchProducts";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    setProducts(await fetchProducts());
  };

  return { products, setProducts, getProducts };
}
