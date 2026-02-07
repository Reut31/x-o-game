export const BOARD_SIZE = 9;

export function getBoard(turns, upTo = turns.length) {
  const board = Array(BOARD_SIZE).fill(null);

  for (let i = 0; i < upTo; i++) {
    const move = turns[i];
    if (!move) continue;

    const { index, value } = move;
    board[index] = value;
  }

  return board;
}

export function calculateWinner(board) {
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

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}
