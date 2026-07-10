export function EmptyState({
  title = "Nenhum Pokémon encontrado",
  message = "Tente buscar por outro nome, número ou ajuste os filtros.",
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <span className="text-5xl" aria-hidden="true">
        🔍
      </span>
      <p className="font-display text-lg font-semibold text-ash-800 dark:text-ash-100">{title}</p>
      <p className="max-w-sm text-sm text-ash-600 dark:text-ash-200">{message}</p>
    </div>
  );
}
