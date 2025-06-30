'use strict';

var score = 0;

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});

var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;

var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(function (item) {
  var name = item.name,
      img = item.img;


  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });
  var puntosGanados = Math.ceil(timeLeft * 0.5);
  score += puntosGanados;
  scoreLabel.textContent = 'Score: ' + score;

  if (document.querySelectorAll('.match').length === gameGrid.length) {
  clearInterval(timerInterval);
  grid.style.pointerEvents = 'none';
  showWinMessage();
}
};


var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', function (event) {

  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});


// Crear la barra de progreso
var timerWrapper = document.createElement('div');
timerWrapper.style.width = '100%';
timerWrapper.style.height = '20px';
timerWrapper.style.backgroundColor = '#ccc';
timerWrapper.style.borderRadius = '4px';
timerWrapper.style.overflow = 'hidden';
timerWrapper.style.margin = '20px 0';
timerWrapper.style.maxWidth = '630px';
timerWrapper.style.margin = '20px auto';
timerWrapper.style.border = '2px solid white';
timerWrapper.style.position = 'relative';

var timerBar = document.createElement('div');
timerBar.style.height = '100%';
timerBar.style.width = '100%'; // Comienza llena
timerBar.style.backgroundColor = '#4caf50'; // Verde
timerBar.style.transition = 'width 1s linear';


// Crear el marcador de score
var scoreLabel = document.createElement('span');
scoreLabel.textContent = 'Score: 0';
scoreLabel.style.position = 'absolute';
scoreLabel.style.left = '50%';
scoreLabel.style.top = '50%';
scoreLabel.style.transform = 'translate(-50%, -50%)';
scoreLabel.style.color = '#fff';
scoreLabel.style.fontWeight = 'bold';
scoreLabel.style.fontFamily = 'sans-serif';
scoreLabel.style.pointerEvents = 'none';
scoreLabel.style.zIndex = '2'; // encima del timerBar

// Agregar al DOM
timerWrapper.appendChild(timerBar);
timerWrapper.appendChild(scoreLabel);
game.insertBefore(timerWrapper, grid);

// Iniciar temporizador
var totalTime = 100;
var timeLeft = totalTime;

var timerInterval = setInterval(function () {
  timeLeft--;

  var percent = (timeLeft / totalTime) * 100;
  timerBar.style.width = percent + '%';

  // Cambiar color visualmente según urgencia
  if (timeLeft <= 10) {
    timerBar.style.backgroundColor = 'red';
  } else if (timeLeft <= 30) {
    timerBar.style.backgroundColor = 'orange';
  }

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    timerBar.style.width = '0%';
    grid.style.pointerEvents = 'none';
    showGameOverMessage();
  }
}, 1000);