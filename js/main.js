// main.js

document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('start-button');
  const startScreen = document.getElementById('start-screen');
  const gameContainer = document.getElementById('game');

  startButton.addEventListener('click', function () {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';

    // 👉 Intentar ir a pantalla completa
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(); // Safari
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen(); // IE11
    }

    if (typeof startTimer === 'function') {
      startTimer();
    }
  });
});
