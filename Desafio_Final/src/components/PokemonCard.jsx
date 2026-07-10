import { useState } from "react";
import { Link } from "react-router-dom";
import { TypeBadge } from "./TypeBadge";
import { FavoriteButton } from "./FavoriteButton";
import { useCompare } from "../context/CompareContext";
import { formatPokedexId, capitalize } from "../utils/formatters";
import { getBadgeColor, getCardBgColor } from "../utils/pokemonTypes";

export function PokemonCard({ pokemon }) {
  const { id, name, types, sprite } = pokemon;
  const { isSelected, toggleCompare } = useCompare();
  const [imageFailed, setImageFailed] = useState(false);
  const primaryType = types[0];
  const borderColor = getBadgeColor(primaryType);
  const bgColor = getCardBgColor(primaryType);
  const selectedForCompare = isSelected(id);

  return (
    <Link
      to={`/pokemon/${id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border-2 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg dark:bg-ash-800"
      style={{ borderColor }}
    >
      <div
        className="relative flex h-36 items-center justify-center sm:h-40"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${bgColor} 0%, ${bgColor}55 55%, transparent 80%)`,
        }}
      >
        <span className="absolute left-2 top-2 rounded-full bg-white/80 px-2 py-0.5 text-xs font-bold text-ash-600 dark:bg-ash-900/70 dark:text-ash-200">
          {formatPokedexId(id)}
        </span>
        <div className="absolute right-2 top-2 flex flex-col items-end gap-1">
          {types.map((type) => (
            <TypeBadge key={type} type={type} size="sm" />
          ))}
        </div>
        {sprite && !imageFailed ? (
          <img
            src={sprite}
            alt={capitalize(name)}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-28 w-28 object-contain drop-shadow-md transition-transform duration-200 group-hover:scale-110 sm:h-32 sm:w-32"
          />
        ) : (
          <span className="text-4xl opacity-40" aria-hidden="true">
            ?
          </span>
        )}

        <FavoriteButton id={id} className="absolute bottom-2 left-2" />
        <button
          type="button"
          aria-label={selectedForCompare ? "Remover da comparação" : "Selecionar para comparar"}
          aria-pressed={selectedForCompare}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleCompare({ id, name });
          }}
          className={`absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full text-sm shadow transition hover:scale-110 active:scale-95 ${
            selectedForCompare
              ? "bg-blue-title text-white"
              : "bg-white/90 text-ash-600 dark:bg-ash-900/70 dark:text-ash-200"
          }`}
        >
          ⇄
        </button>
      </div>
      <div className="bg-white px-3 py-3 text-center dark:bg-ash-800">
        <p className="truncate font-display text-base font-semibold text-ash-900 dark:text-ash-100">
          {capitalize(name)}
        </p>
      </div>
    </Link>
  );
}
