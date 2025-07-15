import Pagination from "./Pagination";
import CartShop from "../components/CartShop";
import "../componentesCSS/Products.css";
import Config from "../Config";
import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";

export default function Products() {
  const { products } = useContext(ProductsContext);
  const { cart, addToCart, removeProductFromCart, isProductInCart } = useCart();
   if (!products || products.length === 0) {
    // Mostrar mensaje de carga o algún tipo de spinner mientras los productos están cargando
    return <div>Loading products...</div>;
  }
  return (
    <>
      <CartShop />
      <Pagination />

      <section className="products">
        {products.map((product) => {
          const isInCart = isProductInCart(product.id);

          return (
            <div className="product-card" key={product.id}>
              <Link to={`/details/${product.id}`}>
                {product.Photos && product.Photos.length > 0 && (
                  <img
                    src={Config.PHOTOS_URL + product.Photos[0].path}
                    alt={product.name}
                    style={{ width: "250px" }}
                  />
                )}
              </Link>

              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
          <p className="price">{product.stock}</p> 

              <p className="categories">
                {product.ProductCategory.map((pc) => {
                  return <a key={pc.category.id}>{pc.category.name} </a>;
                })}
              </p> 
              <button
                className="add-to-cart"
                onClick={() => {
                  isInCart
                    ? removeProductFromCart(product.id)
                    : addToCart(product);
                }}
              >
                {isInCart ? "ya esta en el carrito" : "añadir al carrito "}
              </button>
            </div>
          );
        })}
      </section>
      <Pagination />
    </>
  );
}
