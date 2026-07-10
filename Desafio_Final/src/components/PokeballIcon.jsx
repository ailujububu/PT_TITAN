export function PokeballIcon({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="var(--color-pokeball-white)" stroke="var(--color-pokeball-black)" strokeWidth="2.5" />
      <path
        d="M2 20a18 18 0 0 1 36 0z"
        fill="var(--color-pokeball-red)"
        stroke="var(--color-pokeball-black)"
        strokeWidth="2.5"
      />
      <line x1="2" y1="20" x2="38" y2="20" stroke="var(--color-pokeball-black)" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="6" fill="var(--color-pokeball-white)" stroke="var(--color-pokeball-black)" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="2.4" fill="var(--color-pokeball-white)" stroke="var(--color-pokeball-black)" strokeWidth="1.5" />
    </svg>
  );
}
