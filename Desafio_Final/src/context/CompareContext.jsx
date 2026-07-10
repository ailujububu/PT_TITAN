import { createContext, useContext, useState } from "react";

const CompareContext = createContext(null);
const MAX_COMPARE = 2;

export function CompareProvider({ children }) {
  const [selected, setSelected] = useState([]);

  function isSelected(id) {
    return selected.some((pokemon) => pokemon.id === id);
  }

  function toggleCompare(pokemon) {
    setSelected((current) => {
      if (current.some((entry) => entry.id === pokemon.id)) {
        return current.filter((entry) => entry.id !== pokemon.id);
      }
      if (current.length >= MAX_COMPARE) {
        return [current[1], pokemon];
      }
      return [...current, pokemon];
    });
  }

  function clearCompare() {
    setSelected([]);
  }

  return (
    <CompareContext.Provider
      value={{ selected, isSelected, toggleCompare, clearCompare, maxCompare: MAX_COMPARE }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare deve ser usado dentro de CompareProvider");
  return context;
}
