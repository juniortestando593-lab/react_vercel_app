// Arquivo: src/pages/Favorites.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getFavorites, removeFavorite } from "../utils/favorites";
import BookCard from "../components/BookCard";

export default function Favorites() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setList(getFavorites());
  }, []);

  function handleRemove(book) {
    const updated = removeFavorite(book);
    setList(updated);
  }

  if (list.length === 0) {
    return (
      <div className="container">
        <h2>Favoritos</h2>
        <p>Nenhum favorito salvo.</p>
        <button onClick={() => navigate("/")}>Voltar à Home</button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Favoritos</h2>
        <button onClick={() => navigate("/")}>Voltar à Home</button>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {list.map((book, index) => (
          <div key={index}>
            {/* BookCard clicável */}
            <BookCard
              book={book}
              onClick={() =>
                navigate("/details", { state: { book } })
              }
            />

            {/* Botões de ação */}
            <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
              <button
                onClick={() =>
                  navigate("/details", { state: { book } })
                }
              >
                Ver Detalhes
              </button>

              <button onClick={() => handleRemove(book)}>
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
