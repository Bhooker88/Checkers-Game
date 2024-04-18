import React, { useState } from "react";
import PokemonSelector from "./PokemonSelector";
import MoveSelector from "./MoveSelector";
import BattleArena from "./BattleArena";
import "./styles.css";

function App() {
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [playerMove, setPlayerMove] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [enemyMove, setEnemyMove] = useState(null);

  return (
    <div className="App">
      <h1>Pokémon Battle Simulator</h1>
      <div>
        <h2>Select Your Pokémon</h2>
        <PokemonSelector onSelect={setPlayerPokemon} />
        {playerPokemon && (
          <MoveSelector pokemon={playerPokemon} onSelect={setPlayerMove} />
        )}
      </div>
      <div>
        <h2>Select Enemy Pokémon</h2>
        <PokemonSelector onSelect={setEnemyPokemon} />
        {enemyPokemon && (
          <MoveSelector pokemon={enemyPokemon} onSelect={setEnemyMove} />
        )}
      </div>
      {playerMove && enemyMove && (
        <BattleArena
          playerPokemon={playerPokemon}
          playerMove={playerMove}
          enemyPokemon={enemyPokemon}
          enemyMove={enemyMove}
        />
      )}
    </div>
  );
}

export default App;
