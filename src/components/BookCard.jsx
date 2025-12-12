import React from "react";

export default function BookCard({ book, onClick, showNumber = true, style }) {
  if (!book) return null;

  const cover = book.cover || book.image || ""; // tolerância a campos diferentes

  return (
    <div
      onClick={onClick}
      style={{
        width: 220,
        padding: 12,
        border: "1px solid #e0e6ef",
        borderRadius: 8,
        cursor: onClick ? "pointer" : "default",
        textAlign: "center",
        background: "#ffffff",
        boxShadow: "0 2px 6px rgba(15,30,90,0.04)",
        ...style,
      }}
    >
      <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {cover ? (
          <img
            src={cover}
            alt={book.originalTitle}
            style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 6 }}
          />
        ) : (
          <div style={{ color: "#777" }}>Sem imagem</div>
        )}
      </div>

      <h3 style={{ fontSize: 16, margin: "10px 0 6px" }}>{book.originalTitle}</h3>

      {showNumber && book.number && <p style={{ margin: 0 }}>Livro {book.number}</p>}
    </div>
  );
}
