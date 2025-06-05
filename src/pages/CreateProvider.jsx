import axios from "axios";
import { useState } from "react";
import Config from "../Config";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";

export default function CreateProviderPage() {
  const navigate = useNavigate();
  //asi llamamos un objeto par aun estado
  const [provider, setProvider] = useState({
    name: "",
    enterprise: "",
    phone_number: "",
    email: "",
    address: "",
  });

  const handleInameChange = (event) => {
    //recooremos el array provider y lo remplazamos por el nuevo valor name
    const newProvider = { ...provider, name: event.target.value }; //...provider usa para clonar o actualizar objetos sin modificar el original.
    setProvider(newProvider);
  };
  const handleEnterpriceChange = (event) => {
    const newProvider = { ...provider, enterprise: event.target.value }; //...provider usa para clonar o actualizar objetos sin modificar el original.
    setProvider(newProvider);
  };
  const handlePhoneChange = (event) => {
    const newProvider = { ...provider, phone_number: event.target.value }; //...provider usa para clonar o actualizar objetos sin modificar el original.
    setProvider(newProvider);
  };
  const handleEmailChange = (event) => {
    const newProvider = { ...provider, email: event.target.value }; //...provider usa para clonar o actualizar objetos sin modificar el original.
    setProvider(newProvider);
  };
  const handleAddressChange = (event) => {
    const newProvider = { ...provider, address: event.target.value }; //...provider usa para clonar o actualizar objetos sin modificar el original.
    setProvider(newProvider);
  };
  const handleSubmitProvider = (event) => {
    event.preventDefault();

    axios
      .post(
        Config.BACKEND_URL + "provider/create",
        {
          name: provider.name,
          enterprise: provider.enterprise,
          phone_number: provider.phone_number,
          email: provider.email,
          address: provider.address,
        },
        {}
      )
      .then((res) => {
        navigate("/provider");
      });
  };
  return (
    <>
      <Menu />
      <main className="panel">
        <div className="form-container">
          <h2>Crear Proveedores</h2>
          <form onSubmit={handleSubmitProvider}>
            {/* onBlur → Se ejecuta cuando el input pierde el foco (cuando el usuario hace clic fuera). */}
            <input
              type="text"
              onBlur={handleInameChange}
              placeholder="Nombre"
            />
            <input
              type="text"
              onBlur={handleEnterpriceChange}
              placeholder="Empresa"
            />
            <input
              type="text"
              onBlur={handlePhoneChange}
              placeholder="Celular"
            />
            <input
              type="text"
              onBlur={handleEmailChange}
              placeholder="Correo"
            />
            <input
              type="text"
              onBlur={handleAddressChange}
              placeholder="Direccion"
            />
            <button type="submit">Crear Proovedor</button>
          </form>
        </div>
      </main>
    </>
  );
}
