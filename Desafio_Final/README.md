# Pokédex — Desafio Final

Aplicação React + TailwindCSS + React Router integrada à [PokeAPI](https://pokeapi.co/).

## Rodando o projeto

```bash
npm install
npm run dev
```

## Estrutura

- `src/components` — componentes reutilizáveis (Header, SearchBar, PokemonCard, TypeBadge, StatBar, Loader, EmptyState, ErrorState, FilterBar, CompareBar, ThemeToggle, FavoriteButton).
- `src/pages` — `GalleryPage` (lista, busca, filtro, paginação), `DetailsPage` (rota `/pokemon/:id`), `ComparePage` (rota `/compare`) e `NotFoundPage`.
- `src/context` — `ThemeContext`, `FavoritesContext` e `CompareContext` (estado global via Context API).
- `src/hooks` — `useDebounce`.
- `src/services/pokeApi.js` — chamadas `fetch` à PokeAPI e normalização dos dados.
- `src/utils` — formatação (`formatters.js`) e cores por tipo (`pokemonTypes.js`).

## Funcionalidades extras

- **Favoritos**: coração em cada card e na página de detalhes, persistido em `localStorage`.
- **Modo claro/escuro**: alternável pelo botão no cabeçalho, persistido em `localStorage`.
- **Paginação**: botão "Carregar mais" que busca os próximos 20 Pokémon.
- **Filtro por tipo**: pílulas de tipo acima da galeria, combináveis com busca e favoritos.
- **Comparação**: botão ⇄ em cada card seleciona até 2 Pokémon; uma barra flutuante leva à tela `/compare` com estatísticas lado a lado.
