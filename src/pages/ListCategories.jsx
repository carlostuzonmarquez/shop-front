import { useEffect, useState } from "react";
import Category from "../components/Category";
import Config from "../Config";
import useCategories from "../hooks/useCategories";
import { Link } from "react-router-dom";
import axios from "axios";
import Menu from "../components/Menu";

export default function ListCategoriesPage() {
  const [error, setError] = useState();
  const { getCategories, categories, setCategories } = useCategories();

  const handleDelete = (categoryId) => {
    axios
      .delete(Config.BACKEND_URL + "category/" + categoryId, {})
      .then((res) => {
        getCategories();
      });
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Menu />
      <main className="panel">
        <div className="contenido">
          <Link to="/create/category" className="button">
            Create Category
          </Link>

          <p>{error}</p>

          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>controls</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => {
                return (
                  <Category
                    key={category.id}
                    id={category.id}
                    name={category.name}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
