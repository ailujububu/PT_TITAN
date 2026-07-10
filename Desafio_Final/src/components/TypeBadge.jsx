import { capitalize } from "../utils/formatters";
import { getBadgeColor } from "../utils/pokemonTypes";

export function TypeBadge({ type, size = "md" }) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs";

  return (
    <span
      className={`rounded-full font-sans font-bold text-white capitalize shadow-sm ${sizeClasses}`}
      style={{ backgroundColor: getBadgeColor(type) }}
    >
      {capitalize(type)}
    </span>
  );
}
