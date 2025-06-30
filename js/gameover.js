// gameover.js

function showWinMessage() {
  const overlay = createOverlay("🎉 ¡Felicidades! Ganaste el juego 🎉", score);
  document.body.appendChild(overlay);
  playSound('win');
}

function showGameOverMessage() {
  const overlay = createOverlay("⏱️ ¡Se acabó el tiempo! 😢", score);
  document.body.appendChild(overlay);
  playSound('lose');
}

function createOverlay(message, finalScore) {
  const overlay = document.createElement('div');
  overlay.className = 'game-over';

  overlay.innerHTML = `
    <div class="message">
      <p>${message}</p>
      <p><strong>Score:</strong> ${finalScore}</p>
      <button onclick="restartGame()">🔁 Jugar de nuevo</button>
    </div>
  `;

  return overlay;
}

function restartGame() {
  window.location.reload(); // Simplemente recarga la página
}

// 🎵 Sonidos
function playSound(type) {
  const sounds = {
    match: 'sounds/match.wav',
    win: 'sounds/win.wav',
    lose: 'sounds/lose.wav'
  };

  const audio = new Audio(sounds[type]);
  audio.play();
}
