import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 pt-24 text-center">
      <span className="text-6xl" aria-hidden="true">
        🐛
      </span>
      <h1 className="font-display text-2xl font-bold text-ash-900 dark:text-ash-100">
        Página não encontrada
      </h1>
      <p className="text-sm text-ash-600 dark:text-ash-200">
        Parece que esse Pokémon fugiu para outra rota.
      </p>
      <Link
        to="/"
        className="rounded-full bg-blue-title px-5 py-2 font-semibold text-white shadow transition hover:brightness-110"
      >
        Voltar para Galeria
      </Link>
    </div>
  );
}
