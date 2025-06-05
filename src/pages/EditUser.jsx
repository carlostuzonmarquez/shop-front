import { useEffect, useState } from "react";
import { editUser } from "../services/editUser";
import { useNavigate, useParams } from "react-router-dom";
import Config from "../Config";
import Menu from "../components/Menu";

export default function EditUserPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState([]);

  const handleName = (event) => {
    setUserName(event.target.value);
  };

  const handlePassword = (event) => {
    setUserPassword(event.target.value);
  };

  const handleSubmitUSer = async (event) => {
    event.preventDefault();
    const json = await editUser(userId, userName, userPassword);
    if (json.message === "ok") navigate("/users");
    setError(json.errorResponse.message);
  };

  const fetchUser = async () => {
    const response = await fetch(Config.BACKEND_URL + "user/" + userId);
    const json = await response.json();
    setUserName(json.username);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Menu />
      <main className="panel">
        <div className="form-container">
          <form onSubmit={handleSubmitUSer}>
            <h2>Editar Usuario</h2>
            <input
              type="email"
              value={userName}
              onBlur={handleName}
              onChange={handleName}
              placeholder="Email"
            />
            <input
              type="password"
              onBlur={handlePassword}
              placeholder="Password"
            />

            <button type="submit">Editar</button>
            <p>
              {error.map((e, index) => {
                return <label key={index}>{e}</label>;
              })}
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
