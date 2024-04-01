import { BOARD_HEIGHT, BOARD_WIDTH, PIECES } from "./cons";

function createRow(size) {
  return Array(size).fill(0);
}

function createBoard(height, width) {
  return Array(height)
    .fill()
    .map(() => createRow(width));
}

export function newRow() {
  return createRow(BOARD_WIDTH);
}

export function newGameBoard() {
  return createBoard(BOARD_HEIGHT, BOARD_WIDTH);
}

export function getStartXPosition() {
  return Math.floor(BOARD_WIDTH / 2 - 2);
}

export function getRandomPiece() {
  return PIECES[Math.floor(Math.random() * PIECES.length)];
}

export function validatePieceCollision(piece, board) {
  return piece.shape.some((row, y) => {
    return row.some((value, x) => {
      return (
        value !== 0 && board[y + piece.position.y]?.[x + piece.position.x] !== 0
      );
    });
  });
}
