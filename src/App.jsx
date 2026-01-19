import { useState } from "react";
import Board from "./components/Board.jsx";
import "./App.css";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function squareClick(i) {
    if (board[i]) 
      return;

    const next = board.slice();
    next[i] = xIsNext ? "X" : "O";
    setBoard(next);
    setXIsNext(!xIsNext);
  }

  function toStart() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="container">
      <h2 className="status">תור: {xIsNext ? "X" : "O"}</h2>

      <Board board={board} onSquareClick={squareClick} />

    <button className="restart" onClick={toStart}>
      התחילו מחדש
    </button>

    </div>
  );
}
