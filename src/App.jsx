import { useEffect, useMemo, useState } from "react";
import Board from "./components/Board.jsx";
import "./App.css";
import { calculateWinner, getBoard } from "./tictactoe.jsx";

function loadTurns() {
  try {
    const saved = localStorage.getItem("turns");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [turns, setTurns] = useState(loadTurns);
  const [turnIndex, setTurnIndex] = useState(() => loadTurns().length);

  const currentBoard = useMemo(
    () => getBoard(turns, turnIndex),
    [turns, turnIndex]
  );

  const xIsNext = turnIndex % 2 === 0;

  const winner = calculateWinner(currentBoard);
  const isDraw = !winner && currentBoard.every((x) => x !== null);

  const status = winner
    ? `מנצח: ${winner}`
    : isDraw
    ? "תיקו!"
    : `תור: ${xIsNext ? "X" : "O"}`;

  useEffect(() => {
    localStorage.setItem("turns", JSON.stringify(turns));

    localStorage.removeItem("history");
    localStorage.removeItem("currentMove");
  }, [turns]);

  function squareClick(i) {
    if (currentBoard[i] || winner) return;

    const value = xIsNext ? "X" : "O";
    const move = { index: i, value };


    const nextTurns = turns.slice(0, turnIndex);
    const updatedTurns = [...nextTurns, move];

    setTurns(updatedTurns);
    setTurnIndex(updatedTurns.length);
  }

  function toStart() {
    setTurns([]);
    setTurnIndex(0);
    localStorage.removeItem("turns");
  }

  const toHeb = (v) => v;

  const moves = Array.from({ length: turns.length + 1 }, (_, move) => {
    if (move === 0) {
      return (
        <li key={move}>
          <button
            className={`moveBtn ${move === turnIndex ? "activeMove" : ""}`}
            onClick={() => setTurnIndex(move)}
          >
            Start
          </button>
        </li>
      );
    }

    const played = turns[move - 1];
    const label = `תור ${toHeb(played.value)}`;

    return (
      <li key={move}>
        <button
          className={`moveBtn ${move === turnIndex ? "activeMove" : ""}`}
          onClick={() => setTurnIndex(move)}
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
          Start Over
        </button>
      </div>

      <aside className="history">
        <h3 className="historyTitle">Turns</h3>
        <ol className="movesList">{moves}</ol>
      </aside>
    </div>
  );
}
