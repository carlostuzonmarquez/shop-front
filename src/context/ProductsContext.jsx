import { createContext, useEffect, useState } from "react";
import Config from "../Config";
import axios from "axios";

export const ProductsContext = createContext();

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [categoryCanonical, setCategoryCanonical] = useState(null);
  const [orderBy, setOrderBy] = useState(null);
  const getProducts = () => {
    let path = "search/product/list/" + page;
    if (categoryCanonical !== null) {
      path += "/" + categoryCanonical;
    }

    if (orderBy !== null) {
      if (categoryCanonical === null) {
        path += "/all";
      }
      path += "/" + orderBy;
    }
    axios.get(Config.BACKEND_URL + path).then((res) => {
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    });
  };

  useEffect(() => {
    getProducts();
  }, [page, categoryCanonical, orderBy]);
  return (
    <ProductsContext.Provider
      value={{
        setCategoryCanonical,
        products,
        setProducts,
        page,
        setPage,
        setOrderBy,
        totalPages,
        setTotalPages,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
