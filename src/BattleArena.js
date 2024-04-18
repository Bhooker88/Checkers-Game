import React from "react";

function BattleArena({ playerPokemon, playerMove, enemyPokemon, enemyMove }) {
  const simulateBattle = () => {
    const playerWin = Math.random() > 0.5;
    const winner = playerWin ? playerPokemon.name : enemyPokemon.name;
    return `Winner is ${winner} using ${playerWin ? playerMove : enemyMove}`;
  };

  return (
    <div className="BattleArena">
      <h2>Battle Results</h2>
      <p>{simulateBattle()}</p>
    </div>
  );
}

export default BattleArena;
