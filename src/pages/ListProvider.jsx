import axios from "axios";
import { useEffect, useState } from "react";
import Config from "../Config";
import Provider from "../components/Provider";
import { Link } from "react-router-dom";
import useProvider from "../hooks/useProvider";
import Menu from "../components/Menu";

export default function ListProviderPage() {
  const { providers, setProviders, getProvider } = useProvider();

  const handledeleteProvider = (providerId) => {
    axios.delete(Config.BACKEND_URL + "provider/" + providerId).then((res) => {
      setProviders(providers.filter((provider) => provider.id !== providerId));
    });
  };
  useEffect(() => {
    getProvider();
  }, []);
  return (
    <>
      <Menu />
      <main className="panel">
        <div className="contenido">
          <Link to="/provider/create" className="button">
            Create Providers
          </Link>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>enterprise</th>
                <th>phone</th>
                <th>email</th>
                <th>address</th>
                <th>controlers</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((provider) => {
                return (
                  <Provider
                    key={provider.id}
                    id={provider.id}
                    name={provider.name}
                    enterprice={provider.enterprise}
                    phone={provider.phone_number}
                    email={provider.email}
                    address={provider.address}
                    handleDelete={handledeleteProvider}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
