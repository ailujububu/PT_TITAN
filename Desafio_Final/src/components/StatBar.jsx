import { formatStatLabel, statBarColor } from "../utils/formatters";

const MAX_REFERENCE = 180;

export function StatBar({ name, value }) {
  const widthPercent = Math.min(100, (value / MAX_REFERENCE) * 100);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm font-semibold text-ash-800 dark:text-ash-100">
        <span>{formatStatLabel(name)}</span>
        <span>{value}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-ash-100 dark:bg-ash-600">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${widthPercent}%`, backgroundColor: statBarColor(name) }}
        />
      </div>
    </div>
  );
}
