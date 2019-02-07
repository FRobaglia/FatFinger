let input = document.querySelector(`.game`);
let nextWordBox = document.querySelector(`.next-word`);
let timeBox = document.querySelector(`.time`);
let currentWordBox = document.querySelector(`.current-word`);
let darkLightButton = document.querySelector(`.light-dark`);
let scoreBox = document.querySelector(`.score`);
let bestScoreBox = document.querySelector(`.best-score`);
let body = document.querySelector(`body`);

let currentWord;
let nextWord;
let timer = false;
let score;
let time;

let gameMemory = {
  bestScore: localStorage.getItem(`bestScore`),
  displayMode: localStorage.getItem(`displayMode`),
  firstVisit: localStorage.getItem(`firstVisit`)
};

// define if bestScore already exists in localstorage
gameMemory.bestScore = localStorage.getItem(`bestScore`);
if (gameMemory.bestScore == null) {
  gameMemory.bestScore = 0;
}

// define if displayMode already exists in local storage
gameMemory.displayMode = localStorage.getItem(`displayMode`);
if (gameMemory.displayMode === `dark`) {
  body.classList.toggle(`dark`);
  input.style.border = `3px solid whitesmoke`;
} else if (gameMemory.displayMode == null) {
  gameMemory.displayMode = `light`;
  localStorage.setItem(`displayMode`, gameMemory.displayMode);
}

let names = [
  `hetic`,
  `chrome`,
  `javascript`,
  `front-end`,
  `framework`,
  `canvas`,
  `html`,
  `css`,
  `library`,
  `terminal`,
  `bash`,
  `figma`,
  `sketch`,
  `npm`,
  `sass`,
  `internet`,
  `class`,
  `semantic`,
  `full-stack`,
  `design`,
  `firefox`,
  `cookies`,
  `parcel`,
  `flex`,
  `display`,
  `header`,
  `php`,
  `sql`,
  `back-end`,
  `indentation`,
  `codepen`,
  `database`,
  `function`,
  `responsive`,
  `svg`,
  `variable`,
  `loop`,
  `IE11`,
  `markdown`,
  `github`,
  `push`,
  `pull`,
  `commit`,
  `defer`
];

darkLightButton.addEventListener(`click`, function() {
  if (gameMemory.displayMode === `dark`) {
    gameMemory.displayMode = `light`;
  }
  else if (gameMemory.displayMode === `light`) {
    gameMemory.displayMode = `dark`;
  }
  localStorage.setItem(`displayMode`, gameMemory.displayMode);
  body.classList.toggle(`dark`);
  if (gameMemory.displayMode === `dark`) {
    input.style.border = `3px solid whitesmoke`;
  } else if (gameMemory.displayMode === `light`) {
    input.style.border = `3px solid #1d2935`;
  }
});

function init() {
  input.value = null;
  input.placeholder = `type to start`;
  time = 30;
  score = 0;
  timeBox.innerHTML = time;
  newWord();
  printScore();
  bestScoreBox.innerHTML = gameMemory.bestScore;
}

function startTimer() {
  input.placeholder = ``;
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
  if (score > gameMemory.bestScore) {
    gameMemory.bestScore = score;
    localStorage.setItem(`bestScore`, gameMemory.bestScore);
    gameMemory.bestScore = localStorage.getItem(`bestScore`);
    bestScoreBox.innerHTML = gameMemory.bestScore;
  }
  init();
}

function newWord() {
  if (gameMemory.displayMode === `dark`) {
    input.style.border = `3px solid whitesmoke`;
  } else {
    input.style.border = `3px solid #1d2935`;
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

input.addEventListener(`keyup`, function(event) {
  if (!timer) {
    startTimer();
  }
  if (input.value === ``) {
    setNormalBorder();
  } else if (
    input.value === currentWord + ` ` ||
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
  if (input.classList.contains(`dark`)) {
    input.style.border = `3px solid whitesmoke`;
  } else {
    input.style.border = `3px solid #1d2935`;
  }
}

function setGreenBorder() {
  input.style.border = `3px solid #4cd137`;
}
function setRedBorder() {
  input.style.border = `3px solid red`;
}

function goodAnswer() {
  input.value = null;
  setTimeout(setGreenBorder, 100);
  setTimeout(setNormalBorder, 250);
  setTimeout(setGreenBorder, 350);
  setTimeout(setNormalBorder, 500);
  score++;
  if (score > gameMemory.bestScore) {
    gameMemory.bestScore = score;
    localStorage.setItem(`bestScore`, gameMemory.bestScore);
    gameMemory.bestScore = localStorage.getItem(`bestScore`);
    bestScoreBox.innerHTML = gameMemory.bestScore;
  }
  printScore();
  newWord();
}

function badAnswer() {
  input.value = null;
  setTimeout(setRedBorder, 100);
  setTimeout(setNormalBorder, 250);
  setTimeout(setRedBorder, 350);
  setTimeout(setNormalBorder, 500);
  printScore();
  newWord();
}

init();
