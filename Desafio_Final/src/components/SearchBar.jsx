export function SearchBar({ value, onChange }) {
  return (
    <form
      role="search"
      onSubmit={(event) => event.preventDefault()}
      className="mx-auto flex w-full max-w-xl items-center gap-2 rounded-full bg-cream px-5 py-3 shadow-inner ring-1 ring-black/5 dark:bg-ash-900 dark:ring-white/10"
    >
      <span className="text-ash-400" aria-hidden="true">
        🔍
      </span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Pesquise seu Pokémon aqui..."
        aria-label="Pesquisar Pokémon por nome ou número"
        className="w-full bg-transparent font-sans text-sm text-ash-800 placeholder:text-ash-400 focus:outline-none dark:text-ash-100"
      />
    </form>
  );
}
