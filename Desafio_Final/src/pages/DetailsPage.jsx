import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TypeBadge } from "../components/TypeBadge";
import { StatBar } from "../components/StatBar";
import { FavoriteButton } from "../components/FavoriteButton";
import { Loader } from "../components/Loader";
import { ErrorState } from "../components/ErrorState";
import { fetchPokemonDetails } from "../services/pokeApi";
import { capitalize, formatPokedexId } from "../utils/formatters";
import { getCardBgColor, getBadgeColor } from "../utils/pokemonTypes";

export function DetailsPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryTick, setRetryTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setPokemon(null);
    fetchPokemonDetails(id)
      .then((data) => {
        if (!cancelled) setPokemon(data);
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
  }, [id, retryTick]);

  return (
    <div className="mx-auto max-w-md px-4 pb-16 pt-6">
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-ash-800 shadow transition hover:-translate-x-0.5 dark:bg-ash-800 dark:text-ash-100"
      >
        <span aria-hidden="true">←</span> Voltar para Galeria
      </Link>

      {loading && <Loader />}
      {!loading && error && (
        <ErrorState message={error} onRetry={() => setRetryTick((t) => t + 1)} />
      )}

      {!loading && !error && pokemon && (
        <article className="overflow-hidden rounded-3xl border-2 bg-cream shadow-lg dark:bg-ash-800" style={{ borderColor: getBadgeColor(pokemon.types[0]) }}>
          <div
            className="relative flex flex-col items-center gap-3 px-5 pb-6 pt-5"
            style={{
              background: `radial-gradient(circle at 50% 65%, ${getCardBgColor(
                pokemon.types[0]
              )} 0%, ${getCardBgColor(pokemon.types[0])}55 55%, transparent 80%)`,
            }}
          >
            <div className="flex w-full items-start justify-between">
              <div>
                <p className="font-sans text-sm font-semibold text-ash-600 dark:text-ash-200">
                  {formatPokedexId(pokemon.id)}
                </p>
                <h1 className="font-display text-2xl font-bold text-ash-900 dark:text-ash-100">
                  {capitalize(pokemon.name)}
                </h1>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <div className="flex gap-1.5">
                  {pokemon.types.map((type) => (
                    <TypeBadge key={type} type={type} />
                  ))}
                </div>
                <FavoriteButton id={pokemon.id} />
              </div>
            </div>

            {pokemon.sprite && (
              <img
                src={pokemon.sprite}
                alt={capitalize(pokemon.name)}
                className="h-44 w-44 object-contain drop-shadow-xl"
              />
            )}
          </div>

          <div className="space-y-5 bg-cream px-5 py-5 dark:bg-ash-800">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <section>
                <h2 className="mb-2 font-display text-sm font-bold text-ash-800 dark:text-ash-100">
                  Informações Físicas
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg bg-ash-100 px-3 py-2 text-sm dark:bg-ash-900">
                    <span className="text-ash-600 dark:text-ash-200">Altura</span>
                    <span className="font-semibold text-ash-900 dark:text-ash-100">
                      {pokemon.heightM} m
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-ash-100 px-3 py-2 text-sm dark:bg-ash-900">
                    <span className="text-ash-600 dark:text-ash-200">Peso</span>
                    <span className="font-semibold text-ash-900 dark:text-ash-100">
                      {pokemon.weightKg} kg
                    </span>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-2 font-display text-sm font-bold text-ash-800 dark:text-ash-100">
                  Habilidades
                </h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability}
                      className="rounded-lg bg-ash-100 px-3 py-2 text-sm font-medium capitalize text-ash-800 dark:bg-ash-900 dark:text-ash-100"
                    >
                      {capitalize(ability)}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <section>
              <h2 className="mb-3 font-display text-sm font-bold text-ash-800 dark:text-ash-100">
                Estatísticas de Batalha
              </h2>
              <div className="space-y-3">
                {pokemon.stats.map((stat) => (
                  <StatBar key={stat.name} name={stat.name} value={stat.value} />
                ))}
              </div>
            </section>

            <div className="flex items-center justify-between rounded-lg bg-ash-100 px-3 py-2.5 text-sm font-bold dark:bg-ash-900">
              <span className="text-ash-800 dark:text-ash-100">Total</span>
              <span className="text-ash-900 dark:text-ash-100">
                {pokemon.stats.reduce((sum, stat) => sum + stat.value, 0)}
              </span>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
