export async function fetchRandomBook() {
  const res = await fetch("https://potterapi-fedeperin.vercel.app/en/books/random");
  if (!res.ok) throw new Error("Erro ao buscar livro: " + res.status);
  const data = await res.json();
  return data;
}
