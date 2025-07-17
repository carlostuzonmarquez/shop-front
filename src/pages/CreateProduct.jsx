import { useEffect, useState } from "react";
import Config from "../Config";
import useCategories from "../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import CreatePhoto from "../components/CreatePhoto";
import axios from "axios";
import { DeleteIcon, DeleteXIcons, PlusIcons } from "../components/Icons";
import Menu from "../components/Menu";

export default function CreateProductPage() {
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [photosComponent, setPhotoComponent] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    stock: "",
    description: "",
    price: "",
  });

  const { getCategories, categories, setCategories } = useCategories();

  const handleName = (event) => {
    const newProduct = { ...product, name: event.target.value };
    setProduct(newProduct);
  };
  const handleStock = (event) => {
    const newProduct = { ...product, stock: event.target.value };
    setProduct(newProduct);
  };
  const handleDescription = (event) => {
    const newProduct = { ...product, description: event.target.value };
    setProduct(newProduct);
  };
  const handlePrice = (event) => {
    const newProduct = { ...product, price: event.target.value };
    setProduct(newProduct);
  };
  const handleSubmitValue = async (event) => {
    event.preventDefault();

    let chkCategories = document.getElementsByName("categories");
    let selectedCategories = [];
    chkCategories.forEach((category) => {
      if (category.checked) {
        selectedCategories.push(category.value);
      }
    });

    axios
      .post(Config.BACKEND_URL + "product/create", {
        name: product.name,
        stock: product.stock,
        description: product.description,
        price: product.price,
        categories: selectedCategories,
        photos: photos,
      })
      .then((res) => {
        navigate("/products");
      })
      .catch((err) => {
        setError(err.response.data.errorResponse.message);
      });
  };
  const handlePhotoComponent = () => {
    let photoTotal = photosComponent.length;
    const newPhotoComponent = [
      ...photosComponent,
      <CreatePhoto
        key={photoTotal + 1}
        setPhotos={setPhotos}
        photos={photos}
        componentIndex={photoTotal + 1}
        setPhotoComponent={setPhotoComponent}
        photosComponent={photosComponent}
      />,
    ];
    setPhotoComponent(newPhotoComponent);
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="contenedorPrincipal">
      <Menu />
      <main className="panel">
        <div
          className="form-container"
          style={{ display: "flex", width: "100%" }}
        >
          <div className="primerProduct">
            {error.length > 0 && <p className="error">{error.map((e) => e)}</p>}
            <label>Create Product</label>
            <form onSubmit={handleSubmitValue}>
              <input
                type="text"
                name="name"
                onBlur={handleName}
                placeholder="Producto"
              />
              <input
                type="number"
                name="stock"
                onBlur={handleStock}
                placeholder="Cantidad"
              />
              <textarea
                name="description"
                onBlur={handleDescription}
                placeholder="Descripcion"
              ></textarea>
              <input type="number" onBlur={handlePrice} placeholder="Precio" />
              <button type="submit">enviar</button>
              <div className="form-group">
                <label>Categories</label>
                <ul>
                  {categories.map((category) => {
                    return (
                      <li key={category.id}>
                        <input
                          type="checkbox"
                          name="categories"
                          value={category.id}
                        />
                        <label> {category.name}</label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </form>
          </div>
          <div className="segundoProduct">
            <div>
              <button onClick={handlePhotoComponent}>
                <PlusIcons />
              </button>
            </div>

            {photosComponent.map((component) => {
              return component;
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
