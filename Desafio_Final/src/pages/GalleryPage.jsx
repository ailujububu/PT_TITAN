import { useEffect, useMemo, useState } from "react";
import { Header } from "../components/Header";
import { FilterBar } from "../components/FilterBar";
import { PokemonCard } from "../components/PokemonCard";
import { LoadMoreButton } from "../components/LoadMoreButton";
import { Loader } from "../components/Loader";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { CompareBar } from "../components/CompareBar";
import { useDebounce } from "../hooks/useDebounce";
import { useFavorites } from "../context/FavoritesContext";
import {
  fetchPokemonIndex,
  fetchPokemonIndexByType,
  fetchPokemonDetails,
} from "../services/pokeApi";

const PAGE_SIZE = 20;

export function GalleryPage() {
  const { favoriteIds } = useFavorites();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [selectedType, setSelectedType] = useState(null);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [fullIndex, setFullIndex] = useState([]);
  const [indexLoading, setIndexLoading] = useState(true);
  const [indexError, setIndexError] = useState(null);
  const [indexRetryTick, setIndexRetryTick] = useState(0);

  const [typeIndex, setTypeIndex] = useState([]);
  const [typeLoading, setTypeLoading] = useState(false);
  const [typeError, setTypeError] = useState(null);

  const [detailsById, setDetailsById] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setIndexLoading(true);
    setIndexError(null);
    fetchPokemonIndex()
      .then((data) => {
        if (!cancelled) setFullIndex(data);
      })
      .catch((err) => {
        if (!cancelled) setIndexError(err.message);
      })
      .finally(() => {
        if (!cancelled) setIndexLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [indexRetryTick]);

  useEffect(() => {
    if (!selectedType) {
      setTypeIndex([]);
      return;
    }
    let cancelled = false;
    setTypeLoading(true);
    setTypeError(null);
    fetchPokemonIndexByType(selectedType)
      .then((data) => {
        if (!cancelled) setTypeIndex(data);
      })
      .catch((err) => {
        if (!cancelled) setTypeError(err.message);
      })
      .finally(() => {
        if (!cancelled) setTypeLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedType]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [debouncedSearch, selectedType, favoritesOnly]);

  const filteredIndex = useMemo(() => {
    let base = selectedType ? typeIndex : fullIndex;
    if (favoritesOnly) {
      base = base.filter((pokemon) => favoriteIds.includes(pokemon.id));
    }
    const term = debouncedSearch.trim().toLowerCase();
    if (term) {
      base = base.filter(
        (pokemon) => pokemon.name.includes(term) || String(pokemon.id) === term
      );
    }
    return base;
  }, [fullIndex, typeIndex, selectedType, favoritesOnly, favoriteIds, debouncedSearch]);

  const visibleIndex = filteredIndex.slice(0, visibleCount);
  const visibleIds = visibleIndex.map((pokemon) => pokemon.id).join(",");

  useEffect(() => {
    const missing = visibleIndex.filter((pokemon) => !detailsById[pokemon.id]);
    if (missing.length === 0) return;
    let cancelled = false;
    setDetailsLoading(true);
    setDetailsError(null);
    Promise.all(missing.map((pokemon) => fetchPokemonDetails(pokemon.id)))
      .then((results) => {
        if (cancelled) return;
        setDetailsById((current) => {
          const next = { ...current };
          results.forEach((pokemon) => {
            next[pokemon.id] = pokemon;
          });
          return next;
        });
      })
      .catch((err) => {
        if (!cancelled) setDetailsError(err.message);
      })
      .finally(() => {
        if (!cancelled) setDetailsLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleIds]);

  const visiblePokemon = visibleIndex.map((p) => detailsById[p.id]).filter(Boolean);
  const hasMore = visibleCount < filteredIndex.length;
  const loading = indexLoading || typeLoading;
  const blockingError = indexError || typeError;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-6">
      <Header search={search} onSearchChange={setSearch} />
      <FilterBar
        selectedType={selectedType}
        onSelectType={setSelectedType}
        favoritesOnly={favoritesOnly}
        onToggleFavoritesOnly={() => setFavoritesOnly((v) => !v)}
      />

      {loading && <Loader />}

      {!loading && blockingError && (
        <ErrorState message={blockingError} onRetry={() => setIndexRetryTick((t) => t + 1)} />
      )}

      {!loading && !blockingError && filteredIndex.length === 0 && (
        <EmptyState
          title={favoritesOnly ? "Nenhum favorito ainda" : undefined}
          message={
            favoritesOnly
              ? "Toque no coração de um Pokémon para adicioná-lo aos favoritos."
              : undefined
          }
        />
      )}

      {!loading && !blockingError && filteredIndex.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {visiblePokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          {detailsLoading && <Loader label="Carregando mais Pokémon..." />}
          {detailsError && <ErrorState message={detailsError} />}

          {hasMore && !detailsLoading && (
            <LoadMoreButton onClick={() => setVisibleCount((v) => v + PAGE_SIZE)} />
          )}
        </>
      )}

      <CompareBar />
    </div>
  );
}
