export function ErrorState({ message = "Algo deu errado ao buscar os dados.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <span className="text-5xl" aria-hidden="true">
        ⚠️
      </span>
      <p className="font-display text-lg font-semibold text-pokeball-red">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-pokeball-red px-5 py-2 font-semibold text-white shadow transition hover:brightness-110 active:scale-95"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
