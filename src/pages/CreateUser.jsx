import { useState } from "react";
import Config from "../Config";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";

export default function CreateUserPage() {
  const [user, setUser] = useState("");
  const [error, setError] = useState([]);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUser = (event) => {
    setUser(event.target.value);
  };
  const handlePasword = (event) => {
    setPassword(event.target.value);
  };

  const handleUserSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(
        Config.BACKEND_URL + "user/create",
        { username: user, password: password },
        {}
      )
      .then((res) => {
        navigate("/users", { state: { refresh: true } });
      })
      .catch((err) => {
        setError(err.response.data.error.message);
      });
  };
  return (
    <div className="contenedorPrincipal">
      <Menu />
      <main className="panel">
        <div className="form-container">
          <form onSubmit={handleUserSubmit}>
            <h2>Crear Usuario</h2>
            <input
              type="email"
              username="username"
              onBlur={handleUser}
              placeholder="Email"
            />
            <input
              type="password"
              onBlur={handlePasword}
              placeholder="Password"
            />
            <button type="submit">Crear Usuario</button>
          </form>
        </div>
      </main>
    </div>
  );
}
