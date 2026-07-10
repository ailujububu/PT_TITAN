import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TypeBadge } from "../components/TypeBadge";
import { Loader } from "../components/Loader";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";
import { fetchPokemonDetails } from "../services/pokeApi";
import { capitalize, formatPokedexId, formatStatLabel } from "../utils/formatters";
import { getCardBgColor, getBadgeColor } from "../utils/pokemonTypes";

function MiniPokemonPanel({ pokemon }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border-2 bg-cream dark:bg-ash-800"
      style={{ borderColor: getBadgeColor(pokemon.types[0]) }}
    >
      <div
        className="flex flex-col items-center gap-2 px-4 pb-4 pt-4"
        style={{
          background: `radial-gradient(circle at 50% 55%, ${getCardBgColor(
            pokemon.types[0]
          )} 0%, ${getCardBgColor(pokemon.types[0])}55 55%, transparent 80%)`,
        }}
      >
        <p className="text-xs font-semibold text-ash-600 dark:text-ash-200">
          {formatPokedexId(pokemon.id)}
        </p>
        <h2 className="font-display text-lg font-bold text-ash-900 dark:text-ash-100">
          {capitalize(pokemon.name)}
        </h2>
        <div className="flex gap-1.5">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} size="sm" />
          ))}
        </div>
        {pokemon.sprite && (
          <img src={pokemon.sprite} alt={capitalize(pokemon.name)} className="h-28 w-28 object-contain" />
        )}
      </div>
      <div className="flex justify-around gap-2 bg-cream px-3 py-3 text-center text-xs dark:bg-ash-800">
        <div>
          <p className="text-ash-500 dark:text-ash-300">Altura</p>
          <p className="font-semibold text-ash-900 dark:text-ash-100">{pokemon.heightM} m</p>
        </div>
        <div>
          <p className="text-ash-500 dark:text-ash-300">Peso</p>
          <p className="font-semibold text-ash-900 dark:text-ash-100">{pokemon.weightKg} kg</p>
        </div>
      </div>
    </div>
  );
}

export function ComparePage() {
  const [searchParams] = useSearchParams();
  const idA = searchParams.get("a");
  const idB = searchParams.get("b");

  const [pokemonA, setPokemonA] = useState(null);
  const [pokemonB, setPokemonB] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idA || !idB) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([fetchPokemonDetails(idA), fetchPokemonDetails(idB)])
      .then(([a, b]) => {
        if (cancelled) return;
        setPokemonA(a);
        setPokemonB(b);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [idA, idB]);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-6">
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-ash-800 shadow transition hover:-translate-x-0.5 dark:bg-ash-800 dark:text-ash-100"
      >
        <span aria-hidden="true">←</span> Voltar para Galeria
      </Link>

      <h1 className="mb-5 text-center font-display text-2xl font-bold text-ash-900 dark:text-ash-100">
        Comparar Pokémon
      </h1>

      {!idA || !idB ? (
        <EmptyState
          title="Selecione dois Pokémon"
          message="Volte para a galeria, escolha dois Pokémon com o botão ⇄ e toque em Comparar."
        />
      ) : loading ? (
        <Loader />
      ) : error ? (
        <ErrorState message={error} />
      ) : (
        pokemonA &&
        pokemonB && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <MiniPokemonPanel pokemon={pokemonA} />
              <MiniPokemonPanel pokemon={pokemonB} />
            </div>

            <div className="rounded-2xl bg-cream p-5 shadow dark:bg-ash-800">
              <h2 className="mb-4 text-center font-display text-sm font-bold text-ash-800 dark:text-ash-100">
                Estatísticas de Batalha
              </h2>
              <div className="space-y-4">
                {pokemonA.stats.map((statA, index) => {
                  const statB = pokemonB.stats[index];
                  const aWins = statA.value > statB.value;
                  const bWins = statB.value > statA.value;
                  const maxValue = Math.max(statA.value, statB.value, 1);
                  return (
                    <div key={statA.name}>
                      <p className="mb-1 text-center text-xs font-bold uppercase tracking-wide text-ash-500 dark:text-ash-300">
                        {formatStatLabel(statA.name)}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-8 text-right text-sm font-bold ${
                            aWins ? "text-blue-title" : "text-ash-600 dark:text-ash-200"
                          }`}
                        >
                          {statA.value}
                        </span>
                        <div className="flex h-2.5 flex-1 justify-end overflow-hidden rounded-l-full bg-ash-100 dark:bg-ash-600">
                          <div
                            className="h-full rounded-l-full bg-blue-title"
                            style={{ width: `${(statA.value / maxValue) * 100}%` }}
                          />
                        </div>
                        <div className="flex h-2.5 flex-1 overflow-hidden rounded-r-full bg-ash-100 dark:bg-ash-600">
                          <div
                            className="h-full rounded-r-full bg-pokeball-red"
                            style={{ width: `${(statB.value / maxValue) * 100}%` }}
                          />
                        </div>
                        <span
                          className={`w-8 text-sm font-bold ${
                            bWins ? "text-pokeball-red" : "text-ash-600 dark:text-ash-200"
                          }`}
                        >
                          {statB.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-ash-100 pt-3 text-sm font-bold dark:border-ash-600">
                <span>{pokemonA.stats.reduce((sum, s) => sum + s.value, 0)}</span>
                <span className="text-ash-500 dark:text-ash-300">Total</span>
                <span>{pokemonB.stats.reduce((sum, s) => sum + s.value, 0)}</span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
