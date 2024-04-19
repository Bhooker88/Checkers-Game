import React from "react";
import Square from "./Square";
import "./styles.css";

const Board = ({ board, onClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Square
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            onClick={() => onClick(rowIndex, colIndex)}
            className={
              (rowIndex + colIndex) % 2 === 0 ? "square red" : "square black"
            }
          />
        ))
      )}
    </div>
  );
};

export default Board;
