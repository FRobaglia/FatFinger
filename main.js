// html elements
let input = document.querySelector(`.game`);
let nextWordBox = document.querySelector(`.next-word`);
let timeBox = document.querySelector(`.time`);
let currentWordBox = document.querySelector(`.current-word`);
let darkLightButton = document.querySelector(`.light-dark`);
let scoreBox = document.querySelector(`.score`);
let bestScoreBox = document.querySelector(`.best-score`);
let body = document.querySelector(`body`);

// game informations

let game = {
  currentWord: null,
  nextWord: null,
  currentTime: null,
  timerIsActive: false,
  score: null,
  bestScore: localStorage.getItem(`bestScore`),
  displayMode: localStorage.getItem(`displayMode`),
  tutorial: localStorage.getItem(`tutorial`)
};

// define bestScore depending on his value in local storage (best score of user)

if (game.bestScore == null) {
  game.bestScore = 0;
  localStorage.setItem("bestScore", game.bestScore);
}

// define displayMode depending on his value in local storage(last mode selected by user)

if (game.displayMode === `dark`) {
  body.classList.toggle(`dark`);
  input.style.border = `3px solid whitesmoke`;
} else if (game.displayMode == null) {
  game.displayMode = `light`;
  localStorage.setItem(`displayMode`, game.displayMode);
}

// define tutorial to true if user never visited this website

if (game.tutorial !== "done") {
  // tutorial();
  game.tutorial = "done";
  localStorage.setItem("tutorial", game.tutorial);
}

// Array of all possible words

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
  if (game.displayMode === `dark`) {
    game.displayMode = `light`;
  } else if (game.displayMode === `light`) {
    game.displayMode = `dark`;
  }
  localStorage.setItem(`displayMode`, game.displayMode);
  body.classList.toggle(`dark`);
  if (game.displayMode === `dark`) {
    input.style.border = `3px solid whitesmoke`;
  } else if (game.displayMode === `light`) {
    input.style.border = `3px solid #1d2935`;
  }
});

function init() {
  // Resets the game
  input.value = null;
  input.placeholder = `type to start`;
  game.currentTime = 30;
  score = 0;
  timeBox.innerHTML = game.currentTime;
  newWord();
  printScore(scoreBox);
  bestScoreBox.innerHTML = game.bestScore;
}

function timer() {
  input.placeholder = ``;
  game.timerIsActive = true;
  game.currentTime--;
  timeBox.innerHTML = game.currentTime;
  if (game.currentTime > -1) {
    setTimeout(timer, 1000);
  } else {
    gameOver();
  }
}

function checkNewRecord() {
  if (score > game.bestScore) {
    game.bestScore = score;
    localStorage.setItem(`bestScore`, game.bestScore);
    game.bestScore = localStorage.getItem(`bestScore`);
    bestScoreBox.innerHTML = game.bestScore;
  }
}

function gameOver() {
  game.timerIsActive = false;
  checkNewRecord();
  init();
}

function newWord() {
  if (game.displayMode === `dark`) {
    input.style.border = `3px solid whitesmoke`;
  } else {
    input.style.border = `3px solid #1d2935`;
  }
  if (!game.nextWord) {
    game.currentWord = names[Math.floor(Math.random() * names.length)];
    game.nextWord = names[Math.floor(Math.random() * names.length)];
  } else {
    game.currentWord = game.nextWord;
    game.nextWord = names[Math.floor(Math.random() * names.length)];
  }
  currentWordBox.innerHTML = game.currentWord;
  nextWordBox.innerHTML = game.nextWord;
}

input.addEventListener(`keyup`, function(event) {
  if (!game.timerIsActive) {
    timer();
  }
  if (input.value === ``) {
    setNormalBorder();
  } else if (
    input.value === game.currentWord + ` ` ||
    (input.value === game.currentWord && event.keyCode === 13)
  ) {
    goodAnswer();
  } else if (event.keyCode === 32 || event.keyCode === 13) {
    badAnswer();
  }
});

window.onload = function() {
  // Disable copypaste in input to avoid cheating
  input.onpaste = function(e) {
    e.preventDefault();
  };
};

function printScore(element) {
  element.innerHTML = score;
}

function setNormalBorder() {
  if (game.displayMode === `dark`) {
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
  checkNewRecord();
  printScore(scoreBox);
  newWord();
}

function badAnswer() {
  input.value = null;
  setTimeout(setRedBorder, 100);
  setTimeout(setNormalBorder, 250);
  setTimeout(setRedBorder, 350);
  setTimeout(setNormalBorder, 500);
  printScore(scoreBox);
  newWord();
}

init();
