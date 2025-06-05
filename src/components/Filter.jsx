import axios from "axios";
import "../componentesCSS/Filter.css";
import Config from "../Config";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
export default function Filter() {
  const { setCategoryCanonical, setPage, setOrderBy } =
    useContext(ProductsContext);
  const [categories, setCategories] = useState([]);
  const getFilter = () => {
    axios.get(Config.BACKEND_URL + "category/list").then((res) => {
      setCategories(res.data);
    });
  };

  useEffect(() => {
    getFilter();
  }, []);

  return (
    <>
      <div className="filters">
        <select
          onChange={(event) => {
            setCategoryCanonical(
              event.target.value == "" ? null : event.target.value
            );
            setPage(1);
          }}
          id="category-filter"
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.canonical}>
                {category.name}
              </option>
            );
          })}
        </select>
        <select
          id="sort-by"
          onChange={(event) => {
            setOrderBy(event.target.value);
          }}
        >
          <option value="createdAt">Ordenar por: Fecha de creación</option>
          <option value="price">Ordenar por: Precio</option>
          <option value="name">Ordenar por: Nombre</option>
        </select>
      </div>
    </>
  );
}
