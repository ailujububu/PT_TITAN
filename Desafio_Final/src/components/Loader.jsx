export function Loader({ label = "Carregando Pokémon..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-ash-600 dark:text-ash-200">
      <span className="h-12 w-12 rounded-full border-4 border-pokeball-red border-t-transparent animate-spin" />
      <p className="font-sans font-semibold">{label}</p>
    </div>
  );
}
