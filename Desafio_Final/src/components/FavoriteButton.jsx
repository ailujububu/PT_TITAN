import { useFavorites } from "../context/FavoritesContext";

export function FavoriteButton({ id, className = "" }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(id);

  return (
    <button
      type="button"
      aria-label={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      aria-pressed={active}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(id);
      }}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow transition hover:scale-110 active:scale-95 dark:bg-ash-800/90 ${className}`}
    >
      <span className={active ? "text-pokeball-red" : "text-ash-200"} aria-hidden="true">
        {active ? "❤" : "🤍"}
      </span>
    </button>
  );
}
