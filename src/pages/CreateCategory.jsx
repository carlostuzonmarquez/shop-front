import { useState } from "react";
import Config from "../Config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";

export default function CreateCategoryPage() {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState();
  //actualiza el estado cada vez que el usuario actualiza
  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };
  const handleSubmitValue = async (event) => {
    event.preventDefault();

    if (categoryName === "") {
      setCategoryName(document.getElementById("catName").value);
    }

    axios
      .post(Config.BACKEND_URL + "category/create", { name: categoryName }, {})
      .then((res) => {
        setCategoryName(res.data.categoryName);
        navigate("/categories");
      });
  };
  return (
        <div className="contenedorPrincipal">

      <Menu />
      <main className="panel">
        <div className="form-container">
          <form onSubmit={handleSubmitValue}>
            <h2>Crear Categoria</h2>
            <input
              type="text"
              name="name"
              id="catName"
              onChange={handleInputChange}
              placeholder="Crear categoria"
            />
            <button type="submit">Crear</button>
          </form>
        </div>
      </main>
    </div>
  );
}
