import { useEffect, useState } from "react";
import Config from "../Config";
import useUsers from "../hooks/useUsers";
import User from "../components/User";
import { Link, useLocation } from "react-router-dom";
import Menu from "../components/Menu";

export default function ListUsersPage() {
  const { users, setUsers, getUsers } = useUsers();
  const location = useLocation();

  const handleDelete = async (userId) => {
    await fetch(Config.BACKEND_URL + "user/" + userId, {
      method: "DELETE",
    });
    setUsers(users.filter((user) => user.id !== userId));
  };

  useEffect(() => {
    getUsers();
  }, [location]);
  return (
    <div className="contenedorPrincipal">
      <Menu />
      <main className="panel">
        <div className="contenido">
          <Link to="/create/users" className="button">
            Create Users
          </Link>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>email</th>
                <th>controls</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <User
                    key={user.id}
                    id={user.id}
                    name={user.username}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
