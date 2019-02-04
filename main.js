let input = document.querySelector(".game");
let currentWord;
let span = document.querySelector(".current-word");
let scoreBox = document.querySelector(".score");
let timeBox = document.querySelector(".time");
let lastScoreBox = document.querySelector(".last-score");
let bestScoreBox = document.querySelector(".best-score");
let lastScore = 0;
let bestScore = 0;
let score;
let time;
let names = [
  "hetic",
  "brontis",
  "javascript",
  "bcalou",
  "framework",
  "canvas",
  "html",
  "css",
  "library",
  "terminal",
  "bash",
  "vscode",
  "figma",
  "sketch",
  "CMDER",
  "npm",
  "sass",
  "web"
];

function init() {
  lastScoreBox.innerHTML = lastScore;
  bestScoreBox.innerHTML = bestScore;
  time = 60;
  score = 0;
  timeBox.innerHTML = time;
  newWord();
  updateScore();
  updateTime();
}

function updateTime() {
  timeBox.innerHTML = time;
  time--;
  if (time > 0) {
    setTimeout(updateTime, 1000);
  } else {
    lastScore = score;
    if (lastScore > bestScore) {
      bestScore = lastScore;
    }
    init();
  }
}

function updateScore() {
  scoreBox.innerHTML = score;
}

function newWord() {
  input.style.border = "3px solid black";
  currentWord = names[Math.floor(Math.random() * names.length)];
  span.innerHTML = currentWord;
}

input.addEventListener("keyup", function() {
  if (input.value === "") {
    input.style.border = "3px solid black";
  } else if (input.value === currentWord) {
    input.style.border = "3px solid green";
  } else if (input.value === currentWord + " ") {
    score++;
    input.value = null;
    newWord();
    updateScore();
  } else {
    for (let i = 0; i < input.value.length; i++) {
      const letter = input.value[i];
      if (letter != currentWord[i]) {
        input.style.border = "3px solid red";
      } else {
        input.style.border = "3px solid green";
      }
    }
  }
});

init();
