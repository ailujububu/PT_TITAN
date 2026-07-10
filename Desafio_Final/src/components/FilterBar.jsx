import { POKEMON_TYPES, getBadgeColor } from "../utils/pokemonTypes";
import { capitalize } from "../utils/formatters";

export function FilterBar({ selectedType, onSelectType, favoritesOnly, onToggleFavoritesOnly }) {
  return (
    <div className="mx-auto mb-6 flex w-full max-w-5xl flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => onSelectType(null)}
          className={`rounded-full px-3 py-1 text-xs font-bold shadow-sm transition ${
            selectedType === null
              ? "bg-ash-800 text-white dark:bg-ash-100 dark:text-ash-900"
              : "bg-white text-ash-600 hover:bg-ash-100 dark:bg-ash-800 dark:text-ash-200"
          }`}
        >
          Todos
        </button>
        {POKEMON_TYPES.map((type) => {
          const active = selectedType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onSelectType(active ? null : type)}
              className="rounded-full px-3 py-1 text-xs font-bold capitalize text-white shadow-sm transition"
              style={{
                backgroundColor: getBadgeColor(type),
                opacity: active ? 1 : 0.55,
                outline: active ? "2px solid var(--color-blue-title)" : "none",
                outlineOffset: "2px",
              }}
            >
              {capitalize(type)}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onToggleFavoritesOnly}
        className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold shadow-sm transition ${
          favoritesOnly
            ? "bg-pokeball-red text-white"
            : "bg-white text-ash-600 hover:bg-ash-100 dark:bg-ash-800 dark:text-ash-200"
        }`}
      >
        <span aria-hidden="true">{favoritesOnly ? "❤" : "🤍"}</span>
        Somente favoritos
      </button>
    </div>
  );
}
