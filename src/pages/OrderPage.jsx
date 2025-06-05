import "../componentesCSS/Order.css";
import MenuHome from "../components/MenuHome";

export default function OrderPage() {
  return (
    <>
      <MenuHome />
      <div className="idContainer">
        <div className="idCompra">
          <div className="idPersona">
            <form>
              <h2>Identificacion</h2>

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

          <div className="idDetallesCompra">
            <h2>Resumen de la compra</h2>
            <div>
              <img src="https://placehold.co/100x100" alt="producto" />
              <h2>Nombre del producto</h2>
              <span>Bs.</span>
              <p>
                <span>Total</span>
                <span>Bs.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
