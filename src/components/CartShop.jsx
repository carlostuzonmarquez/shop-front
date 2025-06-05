import axios from "axios";
import { useState } from "react";
import "../componentesCSS/CartShop.css";
import Config from "../Config";
import { useCart } from "../hooks/useCart";
import { DeleteXIcons, ShopinCartIcon } from "./Icons";
import { Link } from "react-router-dom";

export default function CartShop() {
  const { cart, clearCart } = useCart();

  // Estado para manejar el stock de cada producto en el carrito
  const [quantityState, setQuantityState] = useState(
    cart.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {})
  );

  const updateStock = () => {
    cart.forEach((item) => {
      axios.patch(Config.BACKEND_URL + "product/edit", {
        id: item.id,
        name: item.name,
        stock: item.stock - (quantityState[item.id] || 0), // Resta la cantidad comprada al stock
        description: item.description,
        price: item.price,
      });
    });
  };

  const total = cart.reduce((acc, item) => {
    const quantity = quantityState[item.id] ?? 1;
    return acc + item.price * quantity;
  }, 0);
  const handleQuantityChange = (id, event) => {
    const newQuantity = Math.max(1, parseInt(event.target.value, 10) || 1); // Evita valores negativos o vacíos
    setQuantityState((prevQuantity) => ({
      ...prevQuantity,
      [id]: newQuantity, // Actualiza solo el producto con el id específico
    }));
  };

  return (
    <>
      <div
        onClick={() => {
          document.getElementById("cart-dropdown").classList.toggle("active");
        }}
        className="fixed-cart-icon"
        id="fixed-cart-icon"
      >
        <ShopinCartIcon />
        <span className="cart-count">{cart.length}</span>
      </div>

      <div className="cart-dropdown" id="cart-dropdown">
        <h2>Carrito de Compras</h2>
        <ul className="cart-items">
          {cart.map((item) => {
            return (
              <li key={item.id}>
                <img
                  src={Config.PHOTOS_URL + item.Photos[0].path}
                  alt={item.name}
                />
                <p> {item.name} </p>
                <p>{item.price}$</p>
                <div className="amount">
                  <input
                    type="number"
                    value={quantityState[item.id] ?? 1} // Muestra la cantidad seleccionada
                    min="1"
                    max={item.stock} // No permite comprar más de lo que hay en stock
                    onChange={(event) => handleQuantityChange(item.id, event)}
                  />

                  <button
                    onClick={() => {
                      clearCart();
                    }}
                  >
                    <DeleteXIcons />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="cart-total">
          <span>Total:</span>
          <span className="total-price">${total.toFixed(2)}</span>
        </div>
        <Link to={`/order`}>
          <button
            className="checkout-btn"
            onClick={() => {
              updateStock();
            }}
          >
            Finalizar Compra
          </button>
        </Link>
      </div>
    </>
  );
}
