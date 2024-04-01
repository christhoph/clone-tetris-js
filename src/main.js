import "../styles/style.css";

import { playAudio, stopAudio } from "./audio";
import {
  getRandomPiece,
  getStartXPosition,
  newGameBoard,
  newRow,
  validatePieceCollision,
} from "./utils";
import {
  BLOCK_SIZE,
  BOARD_COLOR,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  EVENT_MOVEMENTS,
  LINE_COLOR,
  PIECE_COLOR,
} from "./cons";

const $score = document.querySelector("#score");
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

let score = 0;
let lastTime = 0;
let dropCounter = 0;
let board = newGameBoard();

const piece = {
  shape: getRandomPiece(),
  position: { x: getStartXPosition(), y: 0 },
};

function startCanvas() {
  canvas.width = BLOCK_SIZE * BOARD_WIDTH;
  canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

  context.scale(BLOCK_SIZE, BLOCK_SIZE);
}

function draw() {
  context.fillStyle = BOARD_COLOR;
  context.fillRect(0, 0, canvas.width, canvas.height);

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = LINE_COLOR;
        context.fillRect(x, y, 1, 1);
      }
    });
  });

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillStyle = PIECE_COLOR;
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
      }
    });
  });

  $score.innerText = score;
}

function checkCollision() {
  return validatePieceCollision(piece, board);
}

function onGameOver() {
  stopAudio();
  window.alert("GAME OVER!! Sorry!");
  board = newGameBoard();
  playAudio();
}

function solidifyPiece() {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board[y + piece.position.y][x + piece.position.x] = 1;
      }
    });
  });

  // reset position
  piece.position.x = getStartXPosition();
  piece.position.y = 0;

  // get random shape
  piece.shape = getRandomPiece();

  if (checkCollision()) {
    onGameOver();
  }
}

function removeRows() {
  const rowsToRemove = [];

  board.forEach((row, y) => {
    if (row.every((value) => value === 1)) {
      rowsToRemove.push(y);
    }
  });

  rowsToRemove.forEach((y) => {
    board.splice(y, 1);

    board.unshift(newRow());

    score += 10;
  });
}

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;

  if (dropCounter > 1000) {
    piece.position.y++;

    dropCounter = 0;

    if (checkCollision()) {
      piece.position.y--;

      solidifyPiece();
      removeRows();
    }
  }

  draw();

  window.requestAnimationFrame(update);
}

function startGame() {
  startCanvas();

  document.addEventListener("keydown", (event) => {
    if (event.key === EVENT_MOVEMENTS.LEFT) {
      piece.position.x--;

      if (checkCollision()) {
        piece.position.x++;
      }
    }

    if (event.key === EVENT_MOVEMENTS.RIGHT) {
      piece.position.x++;

      if (checkCollision()) {
        piece.position.x--;
      }
    }

    if (event.key === EVENT_MOVEMENTS.DOWN) {
      piece.position.y++;

      if (checkCollision()) {
        piece.position.y--;

        solidifyPiece();
        removeRows();
      }
    }

    if (event.key === EVENT_MOVEMENTS.UP) {
      const rotated = [];

      for (let i = 0; i < piece.shape[0].length; i++) {
        const row = [];

        for (let j = piece.shape.length - 1; j >= 0; j--) {
          row.push(piece.shape[j][i]);
        }

        rotated.push(row);
      }

      const prevShape = piece.shape;

      piece.shape = rotated;

      if (checkCollision()) {
        piece.shape = prevShape;
      }
    }
  });

  update();
  playAudio();
}

const $startGame = document.querySelector("section");

$startGame.addEventListener("click", function () {
  $startGame.remove();
  startGame();
});
