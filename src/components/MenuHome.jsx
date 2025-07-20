import { Buscar, MenuIcon, SearchIcon, UserIcon } from "./Icons";
import "../componentesCSS/Header.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Config from "../Config";
import { ProductsContext } from "../context/ProductsContext";

export default function MenuHome() {
  const { page, setProducts, setTotalPages } = useContext(ProductsContext);

  const [word, setWord] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 540);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 540);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const searchProduct = () => {
    if (word.trim() !== "") {
      axios
        .get(`${Config.BACKEND_URL}search/product/${page}/${word}`)
        .then((res) => {
          setProducts(res.data.products);
          setTotalPages(res.data.totalPages);
        });
    } else {
      setError("No se puede buscar un producto vacío.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchProduct();
  };

  const handleLupaClick = () => {
    setShowForm((prev) => !prev);
  };

  const handleChange = (event) => {
    const searchWord = event.target.value;
    if (searchWord.trim() === "") {
      setError("No se puede buscar solo espacios.");
      setWord(searchWord);
      return;
    }

    setError("");
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

        <div className="user-actions">
          {/* Siempre mostrar la lupa en móviles */}
          {isMobile && (
            <button
              onClick={handleLupaClick}
              style={{ background: "none", border: "none", cursor: "pointer" }}
              aria-label="Buscar"
            >
              <Buscar />
            </button>
          )}

          {/* Mostrar formulario si está activado (móvil) o si no es móvil */}
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
              {error && (
                <p className="error" style={{ color: "red" }}>
                  {error}
                </p>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
