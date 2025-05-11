// src/contexts/PokemonGridNavigationContext.tsx
import React, { createContext, useState, useContext } from 'react';

type PokemonGridContextType = {
  selectedIndex: number;
  setTotal: (total: number) => void;
  moveUp: () => void;
  moveDown: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  selectPokemon: () => void;
};

const PokemonGridNavigationContext = createContext<PokemonGridContextType>({
  selectedIndex: 0,
  setTotal: () => {},
  moveUp: () => {},
  moveDown: () => {},
  moveLeft: () => {},
  moveRight: () => {},
  selectPokemon: () => {},
});

export const usePokemonGridNavigation = () => useContext(PokemonGridNavigationContext);

export const PokemonGridNavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [totalPokemon, setTotalPokemon] = useState(0);

  const COLUMNS = 3;

  const setTotal = (total: number) => setTotalPokemon(total);

  const moveUp = () => {
    const newIndex = selectedIndex - COLUMNS;
    if (newIndex >= 0) setSelectedIndex(newIndex);
  };

  const moveDown = () => {
    const newIndex = selectedIndex + COLUMNS;
    if (newIndex < totalPokemon) setSelectedIndex(newIndex);
  };

  const moveLeft = () => {
    if (selectedIndex % COLUMNS !== 0) setSelectedIndex(selectedIndex - 1);
  };

  const moveRight = () => {
    if ((selectedIndex + 1) % COLUMNS !== 0 && selectedIndex + 1 < totalPokemon) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const selectPokemon = () => {
    console.log(`Seleccionaste al Pokémon en la posición ${selectedIndex}`);
    // Aquí puedes activar una función o estado que muestre los detalles del Pokémon seleccionado
  };

  return (
    <PokemonGridNavigationContext.Provider
      value={{
        selectedIndex,
        setTotal,
        moveUp,
        moveDown,
        moveLeft,
        moveRight,
        selectPokemon,
      }}
    >
      {children}
    </PokemonGridNavigationContext.Provider>
  );
};
