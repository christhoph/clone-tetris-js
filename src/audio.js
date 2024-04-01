const audio = new Audio("./tetris.mp3");

audio.volume = 0.5;

export function playAudio() {
  setTimeout(() => {
    audio.play();
  }, 1000);
}

export function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
}

// when the audio ends, it restarts (loop)
audio.addEventListener("ended", function () {
  audio.currentTime = 0;
  audio.play();
});
