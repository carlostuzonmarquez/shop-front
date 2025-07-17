import { useContext, useEffect, useState } from "react";
import "../componentesCSS/Order.css";
import MenuHome from "../components/MenuHome";
import useListProductId from "../services/useListProductId";
import { useCart } from "../hooks/useCart";
import Config from "../Config";

export default function OrderPage() {
  const { cart, clearCart } = useCart();
  const [quantityState, setQuantityState] = useState(
    cart.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {})
  );
  const total = cart.reduce((acc, item) => {
    const quantity = quantityState[item.id] ?? 1;
    return acc + item.price * quantity;
  }, 0);

  const handleSubir = () => {
    alert("felicidades has comprado un producto");
  };
  return (
    <>
      <MenuHome />
      <div className="idContainer">
        <div className="idCompra">
          <div className="idPersona">
            <form onSubmit={handleSubir}>
              <h1>Identificacion</h1>

              <div style={{ display: "flex", gap: "20px" }}>
                <div>
                  <span>Nombre</span>
                  <br />
                  <input type="text" placeholder="nombre" />
                </div>

                <div>
                  <span>Apellido</span>
                  <br />
                  <input type="text" placeholder="apellido" />
                </div>
              </div>

              <p>Correo</p>
              <input type="text" placeholder="aaa@aaa.gmail.com" />

              <span>Numero de telefono</span>
              <br />
              <input type="text" placeholder="numero" />

              <div>
                <span>Direccion</span>
                <textarea></textarea>
              </div>

              <button type="submit">Ir a pago</button>
            </form>
          </div>
          <div className="idDetallesCompra" key={cart.id}>
            <h1>Resumen de la compra</h1>
            {cart.map((cart) => {
              return (
                <div key={cart.id} className="detallesDate">
                  <img
                    src={Config.PHOTOS_URL + cart.Photos[0].path}
                    alt="producto"
                  />
                  <h2>{cart.name}</h2>
                  <span>{cart.price}Bs.</span>
                </div>
              );
            })}
            <h2 style={{ textAlign: "center" }}>Total : {total.toFixed(2)}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
