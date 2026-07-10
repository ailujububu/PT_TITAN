import { useNavigate } from "react-router-dom";
import { useCompare } from "../context/CompareContext";
import { capitalize } from "../utils/formatters";

export function CompareBar() {
  const { selected, toggleCompare, clearCompare, maxCompare } = useCompare();
  const navigate = useNavigate();

  if (selected.length === 0) return null;

  const canCompare = selected.length === maxCompare;

  return (
    <div className="fixed inset-x-0 bottom-4 z-20 flex justify-center px-4">
      <div className="flex max-w-lg flex-wrap items-center gap-3 rounded-full bg-ash-900 px-5 py-3 text-white shadow-xl">
        <span className="text-sm font-semibold">
          Comparar ({selected.length}/{maxCompare}):
        </span>
        {selected.map((pokemon) => (
          <span
            key={pokemon.id}
            className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold"
          >
            {capitalize(pokemon.name)}
            <button
              type="button"
              aria-label={`Remover ${pokemon.name} da comparação`}
              onClick={() => toggleCompare(pokemon)}
              className="text-ash-200 hover:text-white"
            >
              ×
            </button>
          </span>
        ))}
        <button
          type="button"
          onClick={() =>
            canCompare && navigate(`/compare?a=${selected[0].id}&b=${selected[1].id}`)
          }
          disabled={!canCompare}
          className="rounded-full bg-yellow-title px-4 py-1.5 text-xs font-bold text-ash-900 shadow transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          Comparar
        </button>
        <button
          type="button"
          onClick={clearCompare}
          className="text-xs font-semibold text-ash-200 hover:text-white"
        >
          Limpar
        </button>
      </div>
    </div>
  );
}
