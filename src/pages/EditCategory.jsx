import { useEffect, useState } from "react";
import { editCategory } from "../services/editCategory";
import { useNavigate, useParams } from "react-router-dom";
import Config from "../Config";
import Menu from "../components/Menu";
import axios from "axios";

export default function EditCategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState({});

  //actualiza el estado cada vez que el usuario actualiza
  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };
  const handleSubmitValue = async (event) => {
    event.preventDefault();
    if (categoryName === "") {
      setCategoryName(document.getElementById("catName").value);
    }
    editCategory(categoryId, categoryName);
    setCategoryName();
    navigate("/categories");
  };

  const fetchCategories = async () => {
    axios.get(Config.BACKEND_URL + "category/" + categoryId).then((res) => {
      setCategoryName(res.data || "");
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="contenedorPrincipal">
      <Menu />
      <main className="panel">
        <div className="form-container">
          <form onSubmit={handleSubmitValue}>
            <h2>Editar Categoria</h2>
            <input
              type="text"
              name="name"
              id="catName"
              onChange={handleInputChange}
              value={categoryName.name || ""}
            />
            <button type="submit">editar</button>
          </form>
        </div>
      </main>
    </div>
  );
}
