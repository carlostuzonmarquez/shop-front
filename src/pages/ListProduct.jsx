import { useEffect } from "react";
import Product from "./Product";
import useProducts from "../hooks/useProducts";
import { Link, useLocation } from "react-router-dom";
import Config from "../Config";
import Menu from "../components/Menu";
import axios from "axios";
export default function ListProductPage() {
  const { products, setProducts, getProducts } = useProducts();

  const location = useLocation();

  const handleDelete = (productId) => {
    axios.delete(Config.BACKEND_URL + "product/" + productId).then((res) => {
      setProducts(res.data);
    });
  };

  useEffect(() => {
    getProducts();
  }, [location]);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Menu />
      <main className="panel">
        <div className="contenido">
          <Link to="/create/product" className="button">
            Create Products
          </Link>

          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>stock</th>
                <th>price</th>
                <th>Categories</th>
                <th>Photos</th>

                <th>controls</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => {
                return (
                  <Product
                    key={product.id}
                    product={product}
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
// lista de compra
// direccion
// nombre apeliidos
// telefono y mail
// comprar
