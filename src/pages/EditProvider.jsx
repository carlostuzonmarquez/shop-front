import axios from "axios";
import Config from "../Config";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../components/Menu";

export default function EditProviderPage() {
  const navigate = useNavigate();
  //el param sirve para recuperar el valor id
  const { idProvider } = useParams("");
  /* 📌con esto se guarda cada uno de los valores en un estado  
 const [eProvider, setEprovider] = useState();
  const [enterProvider, setEnterEprovider] = useState("");
  const [phoneProvider, setPhoneEprovider] = useState("");
  const [emailProvider, setemailEprovider] = useState("");
  const [addressProvider, setAddresEprovider] = useState("");*/

  //asi podemos guardar los valores son en un objeto
  const [provider, setProvider] = useState({
    name: "",
    enterprise: "",
    phone_number: "",
    email: "",
    address: "",
  });
  // Obtener datos del proveedor
  const getProvider = () => {
    axios
      .get(Config.BACKEND_URL + "provider/" + idProvider)
      .then((res) => {
        // recuperando los valores con el get
        console.log("Datos obtenidos:", res.data);
        /*y asi llamos cada estado para guardarlo 
        setEprovider(res.data.name || "");
        setEnterEprovider(res.data.enterprise || "");
        setPhoneEprovider(res.data.phone_number || "");
        setemailEprovider(res.data.email || "");
        setAddresEprovider(res.data.address || "");*/
        setProvider({
          name: res.data.name || "",
          enterprise: res.data.enterprise || "",
          phone_number: res.data.phone_number || "",
          email: res.data.email || "",
          address: res.data.address || "",
        });
      })
      .catch((error) => console.error("Error al obtener proveedor:", error));
  };
  //// Manejadores para actualizar los inputs
  const handleName = (event) => {
    const newProvider = { ...provider, name: event.target.value }; //...provider usa para clonar o actualizar objetos sin modificar el original.
    setProvider(newProvider);
  };
  const handleEnterprise = (event) => {
    const newProvider = { ...provider, enterprise: event.target.value }; //...provider usa para clonar o actualizar objetos sin modificar el original.
    setProvider(newProvider);
  };
  const handlePhone = (event) => {
    const newProvider = { ...provider, phone_number: event.target.value }; //...provider usa para clonar o actualizar objetos sin modificar el original.
    setProvider(newProvider);
  };
  const handleemail = (event) => {
    const newProvider = { ...provider, email: event.target.value }; //...provider usa para clonar o actualizar objetos sin modificar el original.
    setProvider(newProvider);
  };
  const handleAddress = (event) => {
    const newProvider = { ...provider, address: event.target.value }; //...provider usa para clonar o actualizar objetos sin modificar el original.
    setProvider(newProvider);
  };

  const handleSubmitProvider = (event) => {
    event.preventDefault();
    axios
      .patch(Config.BACKEND_URL + `provider/${idProvider}`, {
        //datos que se envian al backend para actualizar al proveedor
        /*📌
        name: eProvider,
        enterprise: enterProvider,
        phone_number: phoneProvider,
        email: emailProvider,
        address: addressProvider,*/

        name: provider.name,
        enterprise: provider.enterprise,
        phone_number: provider.phone_number,
        email: provider.email,
        address: provider.address,
      })
      .then((res) => {
        navigate("/provider");
      });
  };
  useEffect(() => {
    getProvider();
  }, []);
  return (
    <>
      <Menu />
      <main className="panel">
        <form className="form-container" onSubmit={handleSubmitProvider}>
          <h1>Editar proveedor</h1>
          {/* para que se muestre los valores recuperados se tiene que usar value o default value */}
          <input
            type="text"
            defaultValue={provider.name}
            onBlur={handleName}
            placeholder="nombre"
          />
          <input
            type="text"
            defaultValue={provider.enterprise}
            onBlur={handleEnterprise}
            placeholder="Empresa"
          />
          <input
            type="text"
            defaultValue={provider.phone_number}
            onBlur={handlePhone}
            placeholder="telefono"
          />
          <input
            type="text"
            defaultValue={provider.email}
            onBlur={handleemail}
            placeholder="correo"
          />
          <input
            type="text"
            defaultValue={provider.address}
            onBlur={handleAddress}
            placeholder="direccion"
          />
          <button type="submit">Editar</button>
        </form>
      </main>
    </>
  );
}
