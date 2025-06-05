import axios from "axios";
import Config from "../Config";
import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";

export default function Pagination() {
  const { page, setPage, totalPages } = useContext(ProductsContext);
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handleBack = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  return (
    <div className="pagination">
      {page > 1 && (
        <button
          id="prev-page"
          onClick={() => {
            handleBack();
          }}
        >
          Anterior
        </button>
      )}

      <span id="page-info">
        Página {page} de {totalPages}
      </span>
      {page < totalPages && (
        <button
          onClick={() => {
            handleNext();
          }}
          id="next-page"
        >
          Siguiente
        </button>
      )}
    </div>
  );
}
