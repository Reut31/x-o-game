import Square from "./Square.jsx";

export default function Board({ board, onSquareClick }) {
  return (
    <div className="board">
      {board.map((cell, i) => (
        <Square key={i} value={cell} onClick={() => onSquareClick(i)} />
      ))}
    </div>
  );
}
