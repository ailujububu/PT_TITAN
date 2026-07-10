export function formatPokedexId(id) {
  return `#${String(id).padStart(3, "0")}`;
}

export function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).replace(/-/g, " ");
}

const STAT_LABELS = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "Ataque Especial",
  "special-defense": "Defesa Especial",
  speed: "Velocidade",
};

export function formatStatLabel(statName) {
  return STAT_LABELS[statName] ?? capitalize(statName);
}

const RED_STATS = new Set(["hp", "attack", "defense", "speed"]);

export function statBarColor(statName) {
  return RED_STATS.has(statName) ? "var(--color-stat-red)" : "var(--color-stat-blue)";
}
