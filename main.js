let input = document.querySelector('.game');
let nextWordBox = document.querySelector('.next-word');
let timeBox = document.querySelector('.time');
let currentWordBox = document.querySelector('.current-word');
let darkLightButton = document.querySelector('.light-dark');
let scoreBox = document.querySelector('.score');
let bestScoreBox = document.querySelector('.best-score');
let body = document.querySelector('body');

let currentWord;
let nextWord;

let timer = false;
let bestScore = 0;
let score;
let time;

let names = [
  'hetic',
  'chrome',
  'javascript',
  'front-end',
  'framework',
  'canvas',
  'html',
  'css',
  'library',
  'terminal',
  'bash',
  'figma',
  'sketch',
  'npm',
  'sass',
  'internet',
  'class',
  'semantic',
  'full-stack',
  'design',
  'firefox',
  'cookies',
  'parcel',
  'flex',
  'display',
  'header',
  'php',
  'sql',
  'back-end',
  'indentation',
  'codepen',
  'database',
  'function',
  'responsive',
  'svg',
  'variable',
  'loop',
  'IE11',
  'markdown',
  'github',
  'push',
  'pull',
  'commit',
  'defer'
];

darkLightButton.addEventListener('click', function() {
  body.classList.toggle('dark');
  darkLightButton.classList.toggle('dark');
  input.classList.toggle('dark');
  if (input.classList.contains('dark')) {
    input.style.border = '3px solid whitesmoke';
  } else {
    input.style.border = '3px solid #1d2935';
  }
});

function init() {
  input.value = null;
  input.placeholder = 'type to start';
  time = 30;
  score = 0;
  timeBox.innerHTML = time;
  newWord();
  printScore();
  bestScoreBox.innerHTML = bestScore;
}

function startTimer() {
  input.placeholder = '';
  timer = true;
  time--;
  timeBox.innerHTML = time;
  if (time > -1) {
    setTimeout(startTimer, 1000);
  } else {
    gameOver();
  }
}

function gameOver() {
  timer = false;
  if (score > bestScore) {
    bestScore = score
    bestScoreBox.innerHTML = bestScore;
  }
  init();
}

function newWord() {
  if (input.classList.contains('dark')) {
    input.style.border = '3px solid whitesmoke';
  } else {
    input.style.border = '3px solid #1d2935';
  }
  if (!nextWord) {
    currentWord = names[Math.floor(Math.random() * names.length)];
    nextWord = names[Math.floor(Math.random() * names.length)];
  } else {
    currentWord = nextWord;
    nextWord = names[Math.floor(Math.random() * names.length)];
  }
  currentWordBox.innerHTML = currentWord;
  nextWordBox.innerHTML = nextWord;
}

input.addEventListener('keyup', function(event) {
  if (!timer) {
    startTimer();
  }
  if (input.value === '') {
    setNormalBorder();
  } else if (
    input.value === currentWord + ' ' ||
    (input.value === currentWord && event.keyCode === 13)
  ) {
    goodAnswer();
  } else if (event.keyCode === 32 || event.keyCode === 13) {
    badAnswer();
  }
});

window.onload = function() {
  input.onpaste = function(e) {
    e.preventDefault();
  };
};

function printScore() {
  scoreBox.innerHTML = score;
}

function setNormalBorder() {
  if (input.classList.contains('dark')) {
    input.style.border = '3px solid whitesmoke';
  } else {
    input.style.border = '3px solid #1d2935';
  }
}

function setGreenBorder() {
  input.style.border = '3px solid #2ecc71';
}
function setRedBorder() {
  input.style.border = '3px solid #e74c3c';
}

function goodAnswer() {
  setTimeout(setGreenBorder, 100);
  setTimeout(setNormalBorder, 250);
  setTimeout(setGreenBorder, 350);
  setTimeout(setNormalBorder, 500);
  score++;
  if (score > bestScore) {
    bestScore = score;
    bestScoreBox.innerHTML = bestScore;
  }
  printScore();
  newWord();
  input.value = null;
}

function badAnswer() {
  setTimeout(setRedBorder, 100);
  setTimeout(setNormalBorder, 250);
  setTimeout(setRedBorder, 350);
  setTimeout(setNormalBorder, 500);
  printScore();
  newWord();
  input.value = null;
}
init();
