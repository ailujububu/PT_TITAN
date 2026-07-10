export const POKEMON_TYPES = [
  "grass",
  "fire",
  "water",
  "poison",
  "bug",
  "normal",
  "electric",
  "ground",
  "fairy",
  "fighting",
  "psychic",
  "rock",
  "ghost",
  "ice",
  "steel",
  "flying",
  "dragon",
];

const FALLBACK_BADGE = "#868c6c";
const FALLBACK_BG = "#9fa991";

const BADGE_COLORS = {
  grass: "var(--color-type-grass)",
  fire: "var(--color-type-fire)",
  water: "var(--color-type-water)",
  poison: "var(--color-type-poison)",
  bug: "var(--color-type-bug)",
  normal: "var(--color-type-normal)",
  electric: "var(--color-type-electric)",
  ground: "var(--color-type-ground)",
  fairy: "var(--color-type-fairy)",
  fighting: "var(--color-type-fighting)",
  psychic: "var(--color-type-psychic)",
  rock: "var(--color-type-rock)",
  ghost: "var(--color-type-ghost)",
  ice: "var(--color-type-ice)",
  steel: "var(--color-type-steel)",
  flying: "var(--color-type-flying)",
  dragon: "var(--color-type-dragon)",
};

const CARD_BG_COLORS = {
  grass: "var(--color-typebg-grass)",
  fire: "var(--color-typebg-fire)",
  water: "var(--color-typebg-water)",
  poison: "var(--color-typebg-poison)",
  bug: "var(--color-typebg-bug)",
  normal: "var(--color-typebg-normal)",
  electric: "var(--color-typebg-electric)",
  ground: "var(--color-typebg-ground)",
  fairy: "var(--color-typebg-fairy)",
  fighting: "var(--color-typebg-fighting)",
  psychic: "var(--color-typebg-psychic)",
  rock: "var(--color-typebg-rock)",
  ghost: "var(--color-typebg-ghost)",
  ice: "var(--color-typebg-ice)",
  steel: "var(--color-typebg-steel)",
  flying: "var(--color-typebg-flying)",
  dragon: "var(--color-typebg-dragon)",
};

export function getBadgeColor(type) {
  return BADGE_COLORS[type] ?? FALLBACK_BADGE;
}

export function getCardBgColor(type) {
  return CARD_BG_COLORS[type] ?? FALLBACK_BG;
}
