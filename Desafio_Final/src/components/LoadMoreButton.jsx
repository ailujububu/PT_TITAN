export function LoadMoreButton({ onClick, loading }) {
  return (
    <div className="flex justify-center py-8">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="rounded-full bg-blue-title px-6 py-2.5 font-display font-semibold text-white shadow transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Carregando..." : "Carregar mais"}
      </button>
    </div>
  );
}
