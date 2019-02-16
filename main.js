// html elements
let input = document.querySelector(`.game`);
let nextWordBox = document.querySelector(`.next-word`);
let timeBox = document.querySelector(`.time`);
let currentWordBox = document.querySelector(`.current-word`);
let darkLightButton = document.querySelector(`.light-dark`);
let scoreBox = document.querySelector(`.score`);
let bestScoreBox = document.querySelector(`.best-score`);
let body = document.querySelector(`body`);

let jsWords = [
  `hi();`,
  `for (let i = 0; i < a.length; i++)`,
  `for (let i = 0; i > a.length; i--)`,
  `let user = { name: John, age: 21 }`,
  `let numbers = [1, 2, 3, 4, 5]`,
  `var myString = 'Hello World'`,
  `const pi = 3.14159265`,
  `if (birthday) { user.age++; }`,
  `// some comment`,
  
];

let webWords = [
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

// game informations

let game = {
  currentWord: null,
  nextWord: null,
  currentTime: null,
  timerIsActive: false,
  score: null,
  bestScore: localStorage.getItem(`bestScore`),
  displayMode: localStorage.getItem(`displayMode`),
  tutorial: localStorage.getItem(`tutorial`),
  words: webWords
};


if (localStorage.getItem("gameMode") == "web") {  
  game.words = webWords;
  localStorage.setItem("gameMode", "web");
}
else if (localStorage.getItem("gameMode") == "js") {
  game.words = jsWords;
  localStorage.setItem("gameMode", "js");
}
else if (localStorage.getItem("gameMode") == null) {
  localStorage.setItem("gameMode", "web");
}

// define bestScore if null

if (game.bestScore == null) {
  game.bestScore = 0;
  localStorage.setItem("bestScore", game.bestScore);
}

// define displayMode depending on his value in local storage(last mode selected by user)

if (game.displayMode === `dark`) {
  body.classList.toggle(`dark`);
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

darkLightButton.addEventListener(`click`, function() {
  if (game.displayMode === `dark`) {
    game.displayMode = `light`;
  } else if (game.displayMode === `light`) {
    game.displayMode = `dark`;
  }
  localStorage.setItem(`displayMode`, game.displayMode);
  body.classList.toggle(`dark`);
});

function init() {
  // Resets the game
  input.value = null;
  input.placeholder = `type to start`;
  game.currentTime = 30;
  game.score = 0;
  timeBox.innerHTML = game.currentTime;
  newWord();
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
  if (game.score > game.bestScore) {
    game.bestScore = game.score;
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
  printScore(scoreBox);
  input.value = null;
  if (!game.nextWord) {
    game.currentWord = game.words[Math.floor(Math.random() * game.words.length)];
    game.nextWord = game.words[Math.floor(Math.random() * game.words.length)];
    while (game.nextWord === game.currentWord) {
      // roll word again if it's same than current word
      game.nextWord = game.words[Math.floor(Math.random() * game.words.length)];
    }
  } else {
    game.currentWord = game.nextWord;
    game.nextWord = game.words[Math.floor(Math.random() * game.words.length)];
    while (game.nextWord === game.currentWord) {
      // roll word again if it's same than current word
      game.nextWord = game.words[Math.floor(Math.random() * game.words.length)];
    }
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
  } else if (input.value === game.currentWord && event.keyCode === 13) {
    goodAnswer();
  } else if (event.keyCode === 13) {
    badAnswer();
  }
});

function printScore(element) {
  element.innerHTML = game.score;
}

function setNormalBorder() {
  input.style.border = "";
}
function setGreenBorder() {
  input.style.border = `3px solid #4cd137`;
}
function setRedBorder() {
  input.style.border = `3px solid red`;
}

function goodAnswer() {
  game.score++;
  checkNewRecord();
  newWord();
  setTimeout(setGreenBorder, 100);
  setTimeout(setNormalBorder, 250);
  setTimeout(setGreenBorder, 350);
  setTimeout(setNormalBorder, 500);
}

function badAnswer() {
  newWord();
  setTimeout(setRedBorder, 100);
  setTimeout(setNormalBorder, 250);
  setTimeout(setRedBorder, 350);
  setTimeout(setNormalBorder, 500);
}

window.onload = function() {
  // Disable copypaste in input to avoid cheating
  input.onpaste = function(e) {
    e.preventDefault();
  };
};

// switch modes

let modes = document.querySelectorAll(".gamemodes__list li");

modes[0].addEventListener("click", function() {
  localStorage.setItem("gameMode", "web");
  game.words = webWords;
  game.currentWord = game.words[Math.floor(Math.random() * game.words.length)];
  game.nextWord = game.words[Math.floor(Math.random() * game.words.length)];
  gameOver();
});

modes[1].addEventListener("click", function() {
  localStorage.setItem("gameMode", "js");
  game.words = jsWords;
  game.currentWord = game.words[Math.floor(Math.random() * game.words.length)];
  game.nextWord = game.words[Math.floor(Math.random() * game.words.length)];
  gameOver();
  game.currentTime = 160;
  timeBox.innerHTML = game.currentTime;
});

modes[2].addEventListener("click", function() {
  // change array
});

modes[3].addEventListener("click", function() {
  document.querySelector('.gamemodes').classList.remove('is-shown');
});

// done in js cause mouseover behavior !== css hover behavior
document.querySelector('.gamemodes').addEventListener('mouseover', function() {
  document.querySelector('.gamemodes').classList.add('is-shown');
})

init();