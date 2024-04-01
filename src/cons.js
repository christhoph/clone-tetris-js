export const BOARD_COLOR = "#303840";
export const PIECE_COLOR = "#ff8300";
export const LINE_COLOR = "#0055b8";

export const BLOCK_SIZE = 20;
export const BOARD_WIDTH = 14;
export const BOARD_HEIGHT = 30;

export const EVENT_MOVEMENTS = {
  UP: "ArrowUp",
  RIGHT: "ArrowRight",
  DOWN: "ArrowDown",
  LEFT: "ArrowLeft",
};

export const PIECES = [
  // I
  [[1, 1, 1, 1]],
  // J
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  // L
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  // O
  [
    [1, 1],
    [1, 1],
  ],
  // S
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  // T
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  // Z
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
];
