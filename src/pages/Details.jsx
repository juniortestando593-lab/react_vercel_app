// Arquivo: src/pages/Details.jsx

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { addFavorite, isFavorite } from "../utils/favorites";

export default function Details() {
  const location = useLocation();
  const navigate = useNavigate();

  const book = location.state?.book;

  if (!book) {
    return (
      <div className="container">
        <p>Nenhum livro selecionado.</p>
        <button onClick={() => navigate("/")}>Voltar à Home</button>
      </div>
    );
  }

  const alreadyFavorited = isFavorite(book);

  function handleAddFavorite() {
    const ok = addFavorite(book);
    window.alert(ok ? "Livro adicionado aos favoritos!" : "O livro já está nos favoritos.");
  }

  return (
    <div className="container">
      <div className="header">
        <h2>
          {book.originalTitle}
          {book.number ? ` - Livro ${book.number}` : ""}
        </h2>
        <button onClick={() => navigate("/")}>Voltar</button>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ width: 260 }}>
          {book.cover ? (
            <img
              src={book.cover}
              alt={book.originalTitle}
              style={{ width: "100%", borderRadius: 8 }}
            />
          ) : (
            <div>Sem imagem</div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <p><strong>Data de publicação:</strong> {book.releaseDate}</p>
          <p><strong>Páginas:</strong> {book.pages}</p>
          <p><strong>Descrição:</strong></p>
          <p>{book.description}</p>

          {!alreadyFavorited && (
            <button onClick={handleAddFavorite} style={{ marginTop: 12 }}>
              Adicionar aos Favoritos
            </button>
          )}

          {alreadyFavorited && (
            <p sty le={{ marginTop: 12, fontStyle: "italic", color: "#666" }}>
              Este livro já está nos favoritos.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
