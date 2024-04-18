import React, { useState, useEffect } from "react";

function PokemonSelector({ onSelect }) {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const data = await response.json();
      setPokemons(data.results);
    };

    fetchPokemons();
  }, []);

  return (
    <select
      onChange={(e) =>
        onSelect(pokemons.find((p) => p.name === e.target.value))
      }
    >
      <option>Select a Pokémon</option>
      {pokemons.map((pokemon) => (
        <option key={pokemon.name} value={pokemon.name}>
          {pokemon.name}
        </option>
      ))}
    </select>
  );
}

export default PokemonSelector;
