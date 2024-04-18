import React, { useState, useEffect } from "react";

function MoveSelector({ pokemon, onSelect }) {
  const [moves, setMoves] = useState([]);

  useEffect(() => {
    const fetchMoves = async () => {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      setMoves(data.moves.slice(0, 10));
    };

    fetchMoves();
  }, [pokemon]);

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option>Select a move</option>
      {moves.map((move) => (
        <option key={move.move.name} value={move.move.name}>
          {move.move.name}
        </option>
      ))}
    </select>
  );
}

export default MoveSelector;
