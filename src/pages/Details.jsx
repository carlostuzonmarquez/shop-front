import { useContext, useEffect, useState } from "react";
import PhotoGallery from "./PhotoGallery";
import CartShop from "../components/CartShop";
import { useCart } from "../hooks/useCart";
import { ProductsContext } from "../context/ProductsContext";
import MenuHome from "../components/MenuHome";
import useListProductId from "../services/useListProductId";
export default function Details() {
  const { loadDetails, details } = useListProductId();

  //esto es parte del producto
  const { products } = useContext(ProductsContext);
  const { cart, addToCart, removeProductFromCart } = useCart();

  if (!details) {
    return <p>Cargando detalles...</p>;
  }
  const product = products.find((p) => p.id === details.id);
  const isInCart = cart.some((item) => item.id === details.id);
  const volverAtras = () => {
    window.history.back();
  };
  return (
    <>
      <MenuHome />
      <CartShop />
      <main className="product-detail">
        <PhotoGallery photos={details} />

        {/* <!-- Detalles del Producto --> */}
        <div className="product-info">
          <h1>{details.name}</h1>
          <p className="price">Precio : {details.price}bs</p>
          <p className="description">detalles : {details.description}</p>
          <div className="categories">
            <p>
              Categorías:
              {details.productCategory.map((category) => {
                return (
                  <div key={category.category.id}>
                    <a href="">{category.category.name}</a>
                  </div>
                );
              })}
            </p>
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
      <div style={{ marginLeft: "30px" }}>
        <a className="return " onClick={volverAtras}>
          <span>Atras</span>
        </a>
      </div>
    </>
  );
}
