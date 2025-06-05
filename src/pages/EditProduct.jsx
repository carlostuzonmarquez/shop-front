import { useEffect, useState } from "react";
import Config from "../Config";
import useCategories from "../hooks/useCategories";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import Photo from "../components/Photo";
import CreatePhoto from "../components/CreatePhoto";
import EditNewPhoto from "../components/EditNewPhoto";

export default function EditProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({
    id: "",
    name: "",
    stock: 0,
    description: "",
    price: 0,
    ProductCategory: [],
  });
  const [error, setError] = useState([]);
  const { categories, setCategories, getCategories } = useCategories();
  const [newPhoto, setNewPhoto] = useState(false);
  const [photos, setPhotos] = useState([]);
  //een el useEfect no puede estar el async se deve crear una funcion para recuperar el producto
  const getProduct = async () => {
    const response = await fetch(Config.BACKEND_URL + "product/" + productId);
    const json = await response.json();
    const newProduct = {
      id: json.id || "",
      name: json.name || "",
      stock: json.stock || 0,
      description: json.description || "",
      price: json.price || 0,
      ProductCategory: json.ProductCategory || [],
    };
    setPhotos(json.Photos);
    setProduct(newProduct);
  };

  const handleNameChange = (event) => {
    const newProduct = { ...product, name: event.target.value };
    setProduct(newProduct);
  };
  //con esto recuperamos el nuevo valor
  const handleStockChange = (event) => {
    const newProduct = { ...product, stock: event.target.value };
    //y lo guardamos dentro del producto
    setProduct(newProduct);
  };
  const handleDescriptionChange = (event) => {
    const newProduct = { ...product, description: event.target.value };
    setProduct(newProduct);
  };
  const handlePriceChange = (event) => {
    const newProduct = { ...product, price: event.target.value };
    setProduct(newProduct);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    let categoriesId = [];
    let categoriesCheckbox = document.querySelectorAll(
      'input[type="checkbox"]'
    );
    categoriesCheckbox.forEach((checkbox) => {
      if (checkbox.checked) {
        categoriesId.push(checkbox.value);
      }
    });

    axios
      .patch(Config.BACKEND_URL + "product/edit", {
        id: product.id,
        name: product.name,
        stock: product.stock,
        description: product.description,
        price: product.price,
        categories: categoriesId,
      })
      .then((res) => {});
    navigate("/products");
  };
  const handleNewPhoto = () => {};
  useEffect(() => {
    getProduct();
    getCategories();
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Menu />
      <main className="panel">
        <div className="form-container">
          <p>
            {error.map((e, index) => {
              return <label key={index}>{e}</label>;
            })}
          </p>
          <h2>Edit Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Product name</label>
              <input
                onChange={handleNameChange}
                type="text"
                value={product.name}
              />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input
                onChange={handleStockChange}
                type="number"
                value={product.stock}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                onChange={handleDescriptionChange}
                type="text"
                value={product.description}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                onChange={handlePriceChange}
                type="number"
                value={product.price}
              />
            </div>
            <div className="form-group">
              <label>Categories</label>
              <ul>
                {categories.map((category) => {
                  let checked = false;
                  product.ProductCategory.forEach((productCategory) => {
                    if (productCategory.categoryId === category.id) {
                      checked = true;
                    }
                  });
                  return (
                    <li key={category.id}>
                      <input
                        id={`chk${category.id}`}
                        type="checkbox"
                        value={category.id}
                        checked={product.ProductCategory.some(
                          (productCategory) =>
                            productCategory.categoryId === category.id
                        )}
                        onChange={() => handleCategoryChange(category.id)}
                      />

                      <label htmlFor={`chk${category.id}`}>
                        {category.name}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
            <button type="submit">edit</button>
          </form>
          <div>
            <button
              onClick={() => {
                setNewPhoto(true);
              }}
            >
              Add Photo
            </button>
            {newPhoto && (
              <EditNewPhoto
                productId={productId}
                setNewPhoto={setNewPhoto}
                setPhotos={setPhotos}
                photos={photos}
              />
            )}
            <div>
              {photos.map((photo) => {
                return (
                  <Photo
                    id={photo.id}
                    path={photo.path}
                    key={photo.id}
                    photos={photos}
                    setPhotos={setPhotos}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
