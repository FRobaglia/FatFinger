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
  memory: {
    bestScore: localStorage.getItem(`bestScore`),
    displayMode: localStorage.getItem(`displayMode`),
    tutorial: localStorage.getItem(`tutorial`),
    words: englishWords
  },
  setWords() {
    this.currentWord = this.memory.words[Math.floor(Math.random() * this.memory.words.length)];
    this.nextWord = this.memory.words[Math.floor(Math.random() * this.memory.words.length)];
    if (this.nextWord === this.currentWord) {
      this.setWords();
      return;
    }
    currentWordBox.textContent = game.currentWord;
    nextWordBox.textContent = game.nextWord;
  }
};

// localStorage settings
if (localStorage.getItem(`gameMode`) == `english`) {
  game.memory.words = englishWords;
  localStorage.setItem(`gameMode`, `english`);
} else if (localStorage.getItem(`gameMode`) == `web`) {
  game.memory.words = webWords;
  localStorage.setItem(`gameMode`, `web`);
} else if (localStorage.getItem(`gameMode`) == `js`) {
  game.memory.words = jsWords;
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
if (game.memory.bestScore == null) {
  game.memory.bestScore = 0;
  localStorage.setItem(`bestScore`, game.memory.bestScore);
}

if (game.memory.displayMode === `dark`) {
  body.classList.toggle(`dark`);
} else if (game.memory.displayMode == null) {
  game.memory.displayMode = `light`;
  localStorage.setItem(`displayMode`, game.memory.displayMode);
}

if (game.memory.tutorial !== `done`) {
  // tutorial();
  game.memory.tutorial = `done`;
  localStorage.setItem(`tutorial`, game.memory.tutorial);
}

function init() {
  // Resets the game
  input.value = null;
  input.placeholder = `type to start`;
  game.currentTime = 30;
  if (game.memory.words === jsWords) {
    game.currentTime = 120;
  }
  game.score = 0;
  printScore(scoreBox);
  timeBox.textContent = game.currentTime;
  bestScoreBox.textContent = game.memory.bestScore;
  game.setWords();
}

function timer() {
  game.currentTime--;
  timeBox.textContent = game.currentTime;
  if (game.currentTime > -1) {
    setTimeout(timer, 1000);
  } else {
    gameOver();
  }
}

function checkNewRecord() {
  if (game.score > game.memory.bestScore) {
    game.memory.bestScore = game.score;
    localStorage.setItem(`bestScore`, game.memory.bestScore);
    bestScoreBox.textContent = game.memory.bestScore;
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
  game.nextWord = game.memory.words[Math.floor(Math.random() * game.memory.words.length)];
  if (game.nextWord === game.currentWord) {
    newWord();
    return;
  }
  currentWordBox.textContent = game.currentWord;
  nextWordBox.textContent = game.nextWord;
}

input.addEventListener(`keyup`, function(event) {
  if (!game.timerIsActive) {
    game.timerIsActive = true;
    input.placeholder = ``;
    timer();
  }
  if (input.value === game.currentWord) {
    goodAnswer();
  }
});

function printScore(element) {
  element.textContent = game.score;
}

function goodAnswer() {
  if (playSounds) {
    successSound.play();
  }
  game.score++;
  checkNewRecord();
  newWord();
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
  if (game.memory.displayMode === `dark`) {
    game.memory.displayMode = `light`;
  } else if (game.memory.displayMode === `light`) {
    game.memory.displayMode = `dark`;
  }
  localStorage.setItem(`displayMode`, game.memory.displayMode);
  body.classList.toggle(`dark`);
});

// switch words

let modes = document.querySelectorAll(`.gamemodes__list li`);

modes[0].addEventListener(`click`, function() {
  localStorage.setItem(`gameMode`, `english`);
  game.memory.words = englishWords;
  game.setWords();
  gameOver();
});

modes[1].addEventListener(`click`, function() {
  localStorage.setItem(`gameMode`, `web`);
  game.memory.words = webWords;
  game.setWords();
  gameOver();
});

modes[2].addEventListener(`click`, function() {
  localStorage.setItem(`gameMode`, `js`);
  game.memory.words = jsWords;
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