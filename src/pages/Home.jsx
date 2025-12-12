import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import { fetchRandomBook } from "../services/api";

export default function Home() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function loadBook() {
    setLoading(true);
    try {
      const data = await fetchRandomBook();
      setBook(data);
    } catch (err) {
      console.error("Erro ao buscar livro:", err);
      setBook(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBook();
  }, []);

  if (loading) return <div className="container"><p>Carregando livro...</p></div>;
  if (!book) return (
    <div className="container">
      <p>Erro ao carregar o livro. <button onClick={loadBook}>Tentar novamente</button></p>
    </div>
  );

  return (
    <div className="container">
      <div className="header">
        <h1>Página Inicial</h1>
        <div>
          <button onClick={() => navigate("/favorites")}>Ver Favoritos</button>
        </div>
      </div>

      <div className="card-grid">
        <BookCard
          book={book}
          onClick={() => navigate("/details", { state: { book } })}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <button onClick={loadBook}>Buscar outro livro</button>
      </div>
    </div>
  );
}
