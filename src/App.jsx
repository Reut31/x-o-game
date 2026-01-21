import { useEffect, useState } from "react";
import Board from "./components/Board.jsx";
import "./App.css";

function calculateWinner(b) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, c, d] of lines) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  return null;
}

export default function App() {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [Array(9).fill(null)];
  });

  const [currentMove, setCurrentMove] = useState(() => {
    const saved = localStorage.getItem("currentMove");
    return saved ? JSON.parse(saved) : 0;
  });

  const currentBoard = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const winner = calculateWinner(currentBoard);
  const isDraw = !winner && currentBoard.every((x) => x !== null);

  const status = winner
    ? `מנצח: ${winner}`
    : isDraw
    ? "תיקו!"
    : `תור: ${xIsNext ? "X" : "O"}`;

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
    localStorage.setItem("currentMove", JSON.stringify(currentMove));
  }, [history, currentMove]);

  function squareClick(i) {
    if (currentBoard[i] || winner) return;

    const next = currentBoard.slice();
    next[i] = xIsNext ? "X" : "O";

    const nextHistory = history.slice(0, currentMove + 1);
    setHistory([...nextHistory, next]);
    setCurrentMove(nextHistory.length);
  }

  function toStart() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    localStorage.removeItem("history");
    localStorage.removeItem("currentMove");
  }

 const moves = history.map((_, move) => {
  if (move === 0) {
    return (
      <li key={move}>
        <button
          className={`moveBtn ${move === currentMove ? "activeMove" : ""}`}
          onClick={() => setCurrentMove(move)}
        >
          התחלה
        </button>
      </li>
    );
  }

  const playedBy = move % 2 === 1 ? "X" : "O";
  const label = `מהלך #${move} (${playedBy})`;

  return (
    <li key={move}>
      <button
        className={`moveBtn ${move === currentMove ? "activeMove" : ""}`}
        onClick={() => setCurrentMove(move)}
      >
        {label}
      </button>
    </li>
  );
});


  return (
    <div className="layout">
      <div className="container">
        <h2 className="status">{status}</h2>

        <Board board={currentBoard} onSquareClick={squareClick} />

        <button className="restart" onClick={toStart}>
          התחילו מחדש
        </button>
      </div>

      <aside className="history">
        <h3 className="historyTitle">היסטוריה</h3>
        <ol className="movesList">{moves}</ol>
      </aside>
    </div>
  );
}
