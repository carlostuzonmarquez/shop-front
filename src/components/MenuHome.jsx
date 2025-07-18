import { Buscar, MenuIcon, SearchIcon, UserIcon } from "./Icons";
import "../componentesCSS/Header.css";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Config from "../Config";
import { ProductsContext } from "../context/ProductsContext";

export default function MenuHome() {
  const { page, setProducts, setTotalPages } = useContext(ProductsContext);
  const [word, setWord] = useState("");
  const [error, setError] = useState("");
  const [showForm, showFormSet] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
  });
  const searchProduct = () => {
    if (word !== "") {
      axios
        .get(Config.BACKEND_URL + "search/product/" + page + "/" + word)
        .then((res) => {
          setProducts(res.data.products);
          setTotalPages(res.data.totalPages);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchProduct();
    // const { query } = Object.fromEntries(new window.FormData(event.target));
  };

  const handleSaveSearch = () => {
    showFormSet((prev) => !prev);
  };
  const handleChange = (event) => {
    let searchWord = event.target.value;
    if (searchWord === " ") {
      setError("no se puede buscar el producto");
      return;
    }

    setError(null);
    setWord(searchWord);
  };
  const volverAtras = () => {
    window.history.back();
  };
  return (
    <header>
      <nav>
        <div className="logo">
          <a onClick={volverAtras}>
            Tienda<span>Online</span>
          </a>
        </div>
        {/* buscadorrr */}

        <div className="user-actions">
          {isMobile && (
            <button
              onClick={handleSaveSearch}
              style={{ background: "none", border: "none", cursor: "pointer" }}
              aria-label="Buscar"
            >
              <Buscar />
            </button>
          )}

          {(showForm || !isMobile) && (
            <div className="search-bar">
              <form className="form" onSubmit={handleSubmit}>
                <input
                  onChange={handleChange}
                  type="text"
                  id="search"
                  value={word}
                  placeholder="Buscar productos..."
                />
                <button style={{ cursor: "pointer" }} type="submit">
                  Buscar
                </button>
              </form>
            </div>
          )}

          <div className="acomadar">
            {error && (
              <p className="error" style={{ color: "red" }}>
                {error}
              </p>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
