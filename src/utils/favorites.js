// Arquivo: src/utils/favorites.js

const KEY = "favoritesBooks";

// Retorna todos os favoritos do localStorage
export function getFavorites() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Salva lista no localStorage
export function saveFavorites(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

// Adiciona um livro aos favoritos (sem duplicar)
export function addFavorite(book) {
  if (!book) return false;

  const list = getFavorites();

  const exists = list.some(
    (b) =>
      b.originalTitle === book.originalTitle &&
      b.number === book.number
  );

  if (exists) return false;

  list.push(book);
  saveFavorites(list);
  return true;
}

// Remove um livro dos favoritos
export function removeFavorite(book) {
  const list = getFavorites();
  const filtered = list.filter(
    (b) =>
      !(b.originalTitle === book.originalTitle && b.number === book.number)
  );
  saveFavorites(filtered);
  return filtered;
}

// Verifica se um livro já é favorito
export function isFavorite(book) {
  if (!book) return false;

  const list = getFavorites();

  return list.some(
    (b) =>
      b.originalTitle === book.originalTitle &&
      b.number === book.number
  );
}
