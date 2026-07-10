const BASE_URL = "https://pokeapi.co/api/v2";

export class PokemonNotFoundError extends Error {
  constructor(query) {
    super(`Pokémon "${query}" não encontrado.`);
    this.name = "PokemonNotFoundError";
  }
}

function idFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return Number(parts[parts.length - 1]);
}

function normalizePokemon(data) {
  return {
    id: data.id,
    name: data.name,
    sprite:
      data.sprites?.other?.["official-artwork"]?.front_default ??
      data.sprites?.front_default ??
      null,
    types: data.types
      .sort((a, b) => a.slot - b.slot)
      .map((entry) => entry.type.name),
    heightM: data.height / 10,
    weightKg: data.weight / 10,
    abilities: data.abilities.map((entry) => entry.ability.name),
    stats: data.stats.map((entry) => ({
      name: entry.stat.name,
      value: entry.base_stat,
    })),
  };
}

// Limite da Pokédex nacional: acima disso a API retorna formas alternativas
// (regionais, cosplay, etc.) sem número de dex sequencial e sem artwork oficial.
const NATIONAL_DEX_LIMIT = 1025;

export async function fetchPokemonIndex() {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${NATIONAL_DEX_LIMIT}&offset=0`);
  if (!res.ok) throw new Error("Falha ao carregar a lista de Pokémon.");
  const data = await res.json();
  return data.results.map((entry) => ({
    name: entry.name,
    id: idFromUrl(entry.url),
  }));
}

export async function fetchPokemonIndexByType(type) {
  const res = await fetch(`${BASE_URL}/type/${type}`);
  if (!res.ok) throw new Error(`Falha ao carregar Pokémon do tipo "${type}".`);
  const data = await res.json();
  return data.pokemon
    .map((entry) => ({
      name: entry.pokemon.name,
      id: idFromUrl(entry.pokemon.url),
    }))
    .filter((entry) => entry.id <= NATIONAL_DEX_LIMIT);
}

export async function fetchPokemonDetails(nameOrId) {
  const query = String(nameOrId).toLowerCase().trim();
  const res = await fetch(`${BASE_URL}/pokemon/${query}`);
  if (res.status === 404) throw new PokemonNotFoundError(nameOrId);
  if (!res.ok) throw new Error("Falha ao carregar os detalhes do Pokémon.");
  const data = await res.json();
  return normalizePokemon(data);
}
