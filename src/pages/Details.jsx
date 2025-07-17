import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Config from "../Config";
import { useParams } from "react-router-dom";
import PhotoGallery from "./PhotoGallery";
import CartShop from "../components/CartShop";
import { useCart } from "../hooks/useCart";
import { ProductsContext } from "../context/ProductsContext";
import MenuHome from "../components/MenuHome";
export default function Details() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  //esto es parte del producto
  const { products } = useContext(ProductsContext);
  const { cart, addToCart, removeProductFromCart } = useCart();
  const loadDetails = () => {
    axios.get(Config.BACKEND_URL + "product/" + id).then((res) => {
      setDetails(res.data);
    });
  };
  useEffect(() => {
    loadDetails();
  }, []);

  if (!details) {
    return <p>Cargando detalles...</p>;
  }
  const product = products.find((p) => p.id === details.id);
  const isInCart = cart.some((item) => item.id === details.id);

  return (
    <>
      <MenuHome />
      <CartShop />
      <main className="product-detail">
        <PhotoGallery photos={details} />

        {/* <!-- Detalles del Producto --> */}
        <div className="product-info">
          <h1>{details.name}</h1>
          <p className="price">{details.price}</p>
          <p className="description">{details.description}</p>
          <div className="categories">
            <span>Categorías: </span>
            {details.ProductCategory.map((category) => {
              return (
                <div key={category.category.id}>
                  <a href="">{category.category.name}</a>
                  {index !== details.ProductCategory.length - 1 ? "," : ""}
                </div>
              );
            })}
          </div>
          <button
            className="add-to-cart"
            onClick={() => {
              isInCart ? removeProductFromCart(product.id) : addToCart(product);
            }}
          >
            {isInCart ? "ya esta en el carrito" : "añadir al carrito "}
          </button>
        </div>
      </main>
    </>
  );
}
