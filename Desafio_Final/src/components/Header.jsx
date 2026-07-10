import { Link } from "react-router-dom";
import { PokeballIcon } from "./PokeballIcon";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./SearchBar";

const PIKACHU_SPRITE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png";

export function Header({ search, onSearchChange }) {
  return (
    <header className="relative mx-auto mb-6 w-full max-w-5xl overflow-hidden rounded-3xl bg-cream/90 p-6 shadow-md backdrop-blur dark:bg-ash-800/90 sm:p-8">
      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Link to="/" className="flex items-center gap-1">
            <h1 className="flex items-center font-display text-4xl font-extrabold tracking-wide text-yellow-title [-webkit-text-stroke:1.5px_var(--color-blue-title)] sm:text-5xl">
              P
              <PokeballIcon className="mx-0.5 h-8 w-8 sm:h-10 sm:w-10" />
              KEDÉX
            </h1>
          </Link>
          <p className="text-center font-display text-sm font-bold text-blue-title sm:text-left">
            Descubra e explore seus{" "}
            <span className="text-yellow-title [-webkit-text-stroke:0.6px_var(--color-blue-title)]">
              Pokémons
            </span>{" "}
            favoritos!
          </p>
        </div>

        <img
          src={PIKACHU_SPRITE}
          alt="Pikachu"
          className="hidden h-28 w-28 object-contain drop-shadow-lg sm:block"
          loading="lazy"
        />
      </div>

      <div className="mt-5">
        <SearchBar value={search} onChange={onSearchChange} />
      </div>
    </header>
  );
}
