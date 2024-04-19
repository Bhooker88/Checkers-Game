import React, { useState } from "react";
import Board from "./Board";
import "bootstrap/dist/css/bootstrap.min.css";

function initialBoard() {
  const rows = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));
  for (let i = 0; i < 8; i++) {
    for (let j = i % 2 === 0 ? 1 : 0; j < 8; j += 2) {
      if (i < 3) rows[i][j] = "1";
      else if (i > 4) rows[i][j] = "2";
    }
  }
  return rows;
}

const App = () => {
  const [board, setBoard] = useState(initialBoard());
  const [currentPlayer, setCurrentPlayer] = useState("1");
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [winner, setWinner] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "" });

  const showAlert = (message) => {
    setAlert({ show: true, message });
    setTimeout(() => {
      setAlert({ show: false, message: "" });
    }, 1500);
  };

  const checkForWinner = (board) => {
    let player1Pieces = 0;
    let player2Pieces = 0;

    board.forEach((row) => {
      row.forEach((cell) => {
        if (cell && cell.startsWith("1")) {
          player1Pieces++;
        } else if (cell && cell.startsWith("2")) {
          player2Pieces++;
        }
      });
    });

    if (player1Pieces === 0) {
      return "2";
    } else if (player2Pieces === 0) {
      return "1";
    }

    return null;
  };

  const handleClick = (row, col) => {
    const piece = board[row][col];

    if (selectedPiece) {
      if (isValidMove(selectedPiece.row, selectedPiece.col, row, col)) {
        executeMove(selectedPiece.row, selectedPiece.col, row, col);
      } else {
        showAlert("Invalid move. Please try again.");
        setSelectedPiece(null);
      }
    } else {
      if (
        piece &&
        (piece.startsWith(currentPlayer) ||
          (piece.length === 3 && piece[0] === currentPlayer))
      ) {
        setSelectedPiece({ row, col });
      } else {
        showAlert("Wrong piece selected. It's not your turn.");
      }
    }
  };

  const executeMove = (startRow, startCol, endRow, endCol) => {
    const newBoard = board.map((row) => [...row]);
    let piece = board[startRow][startCol];

    if ((endRow === 0 && piece === "2") || (endRow === 7 && piece === "1")) {
      piece += "K";
    }

    newBoard[endRow][endCol] = piece;
    newBoard[startRow][startCol] = null;

    if (Math.abs(startRow - endRow) === 2) {
      const middleRow = Math.floor((startRow + endRow) / 2);
      const middleCol = Math.floor((startCol + endCol) / 2);
      newBoard[middleRow][middleCol] = null;
    }

    setBoard(newBoard);
    setSelectedPiece(null);
    setCurrentPlayer(currentPlayer === "1" ? "2" : "1");
    const gameWinner = checkForWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      console.log(`Game Over! Player ${gameWinner} wins!`);
    }
  };

  const isValidMove = (startRow, startCol, endRow, endCol) => {
    const startPiece = board[startRow][startCol];
    const isKing = startPiece && startPiece.includes("K");
    const rowDiff = endRow - startRow;
    const colDiff = endCol - startCol;

    if (board[endRow][endCol] !== null) {
      showAlert("Invalid move: Please try again.");
      return false;
    }

    if (isKing) {
      if (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 1) {
        return true;
      } else if (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 2) {
        return checkCapture(startRow, startCol, endRow, endCol);
      }
    } else {
      const isPlayer1 = startPiece.startsWith("1");
      const forwardMove = isPlayer1
        ? rowDiff === 1 || rowDiff === 2
        : rowDiff === -1 || rowDiff === -2;
      const validDirection = isPlayer1 ? rowDiff > 0 : rowDiff < 0;

      if (Math.abs(colDiff) === Math.abs(rowDiff) && forwardMove) {
        if (Math.abs(rowDiff) === 2) {
          return checkCapture(startRow, startCol, endRow, endCol);
        }
        return validDirection;
      }
    }

    showAlert("Invalid move: Move does not comply with the rules.");
    return false;
  };

  const checkCapture = (startRow, startCol, endRow, endCol) => {
    const middleRow = Math.floor((startRow + endRow) / 2);
    const middleCol = Math.floor((startCol + endCol) / 2);
    const middlePiece = board[middleRow][middleCol];
    const startPiece = board[startRow][startCol];
    return middlePiece !== null && middlePiece[0] !== startPiece[0];
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Checkers Game</h1>
      {alert.show && (
        <div className={`alert alert-warning`}>{alert.message}</div>
      )}
      <Board board={board} onClick={winner ? null : handleClick} />
      {winner ? (
        <p>Game Over! Player {winner} wins!</p>
      ) : (
        <p>Current Player: {currentPlayer}</p>
      )}
    </div>
  );
};

export default App;
