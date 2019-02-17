// DOM
let input = document.querySelector(`.game`);
let nextWordBox = document.querySelector(`.next-word`);
let timeBox = document.querySelector(`.time`);
let currentWordBox = document.querySelector(`.current-word`);
let darkLightButton = document.querySelector(`.light-dark`);
let scoreBox = document.querySelector(`.score`);
let bestScoreBox = document.querySelector(`.best-score`);
let body = document.querySelector(`body`);
let soundBox = document.querySelector(`.sound`);

let playSounds = true;

// sounds
let successSound = new Audio(`assets/sounds/success.wav`);
let errorSound = new Audio(`assets/sounds/error.wav`);

// words arrays
let englishWords = [
  `time`,
  `person`,
  `year`,
  `way`,
  `day`,
  `thing`,
  `man`,
  `world`,
  `life`,
  `hand`,
  `part`,
  `child`,
  `eye`,
  `woman`,
  `place`,
  `work`,
  `week`,
  `case`,
  `point`,
  `government`,
  `company`,
  `number`,
  `group`,
  `problem`,
  `fact`,
  `be`,
  `have`,
  `do`,
  `say`,
  `get`,
  `make`,
  `go`,
  `know`,
  `take`,
  `see`,
  `good`,
  `new`,
  `first`,
  `last`,
  `long`,
  `great`,
  `little`,
  `own`,
  `other`,
  `old`,
  `right`,
  `big`,
  `the`,
  `and`,
  `a`,
  `that`,
  `it`,
  `not`,
  `he`,
  `as`,
  `but`,
  `or`
];

let jsWords = [
  `hi();`,
  `for (let i = 0; i < a.length; i++)`,
  `for (let i = 20; i > 0; i--)`,
  `let user = { name: 'John', age: 21 };`,
  `let numbers = [1, 2, 3, 4, 5];`,
  `var myString = 'Hello World';`,
  `const pi = 3.14159265;`,
  `if (user.birthday) { user.age++; }`,
  `// some comment`
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
  words: englishWords,
  setWords() {
    this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
    this.nextWord = this.words[Math.floor(Math.random() * this.words.length)];
    if (this.nextWord === this.currentWord) {
      this.setWords();
    }
    currentWordBox.innerHTML = game.currentWord;
    nextWordBox.innerHTML = game.nextWord;
  }
};

// localStorage settings
if (localStorage.getItem(`gameMode`) == `english`) {
  game.words = englishWords;
  localStorage.setItem(`gameMode`, `english`);
} else if (localStorage.getItem(`gameMode`) == `web`) {
  game.words = webWords;
  localStorage.setItem(`gameMode`, `web`);
} else if (localStorage.getItem(`gameMode`) == `js`) {
  game.words = jsWords;
  localStorage.setItem(`gameMode`, `js`);
} else if (localStorage.getItem(`gameMode`) == null) {
  localStorage.setItem(`gameMode`, `english`);
}

if (localStorage.getItem(`playSounds`) != `true`) {
  playSounds = false;
  soundBox.style.backgroundPosition = `36px 0px`;
} else {
  localStorage.setItem(`playSounds`, playSounds);
}
if (game.bestScore == null) {
  game.bestScore = 0;
  localStorage.setItem(`bestScore`, game.bestScore);
}

if (game.displayMode === `dark`) {
  body.classList.toggle(`dark`);
} else if (game.displayMode == null) {
  game.displayMode = `light`;
  localStorage.setItem(`displayMode`, game.displayMode);
}

if (game.tutorial !== `done`) {
  // tutorial();
  game.tutorial = `done`;
  localStorage.setItem(`tutorial`, game.tutorial);
}

function init() {
  // Resets the game
  input.value = null;
  input.placeholder = `type to start`;
  game.currentTime = 30;
  if (game.words === jsWords) {
    game.currentTime = 120;
  }
  game.score = 0;
  printScore(scoreBox);
  timeBox.innerHTML = game.currentTime;
  bestScoreBox.innerHTML = game.bestScore;
  game.setWords();
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
  game.currentWord = game.nextWord;
  game.nextWord = game.words[Math.floor(Math.random() * game.words.length)];
  if (game.nextWord === game.currentWord) {
    newWord();
    return;
  }
  currentWordBox.innerHTML = game.currentWord;
  nextWordBox.innerHTML = game.nextWord;
}

input.addEventListener(`keyup`, function(event) {
  if (!game.timerIsActive) {
    timer();
  }
  if (input.value === game.currentWord && event.keyCode === 13) {
    goodAnswer();
  } else if (event.keyCode === 13) {
    badAnswer();
  }
});

function printScore(element) {
  element.innerHTML = game.score;
}

function setNormalBorder() {
  input.style.border = ``;
}
function setGreenBorder() {
  input.style.border = `3px solid #4cd137`;
}
function setRedBorder() {
  input.style.border = `3px solid red`;
}

function goodAnswer() {
  if (playSounds) {
    successSound.play();
  }
  game.score++;
  checkNewRecord();
  newWord();
  setTimeout(setGreenBorder, 100);
  setTimeout(setNormalBorder, 250);
  setTimeout(setGreenBorder, 350);
  setTimeout(setNormalBorder, 500);
}

function badAnswer() {
  if (playSounds) {
    errorSound.play();
  }
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

soundBox.addEventListener(`click`, function() {
  // (des)activate sound
  playSounds = !playSounds;
  localStorage.setItem(`playSounds`, playSounds);
  if (playSounds) {
    successSound.play();
    soundBox.style.backgroundPosition = `0px 0px`;
  } else {
    soundBox.style.backgroundPosition = `36px 0px`;
  }
});

darkLightButton.addEventListener(`click`, function() {
  // lightmode/darkmode
  if (game.displayMode === `dark`) {
    game.displayMode = `light`;
  } else if (game.displayMode === `light`) {
    game.displayMode = `dark`;
  }
  localStorage.setItem(`displayMode`, game.displayMode);
  body.classList.toggle(`dark`);
});

// switch words

let modes = document.querySelectorAll(`.gamemodes__list li`);

modes[0].addEventListener(`click`, function() {
  localStorage.setItem(`gameMode`, `english`);
  game.words = englishWords;
  game.setWords();
  gameOver();
});

modes[1].addEventListener(`click`, function() {
  localStorage.setItem(`gameMode`, `web`);
  game.words = webWords;
  game.setWords();
  gameOver();
});

modes[2].addEventListener(`click`, function() {
  localStorage.setItem(`gameMode`, `js`);
  game.words = jsWords;
  game.setWords();
  gameOver();
});

for (let i = 0; i < modes.length; i++) {
  const mode = modes[i];
  mode.addEventListener(`click`, function() {
    document.querySelector(`.gamemodes`).classList.toggle(`is-shown`);
  });
}

init();
