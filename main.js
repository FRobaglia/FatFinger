let input = document.querySelector(".game");
let currentWord;
let currentBox = document.querySelector(".current-word");
let nextWord;
let nextBox = document.querySelector(".next-word");
let scoreBox = document.querySelector(".score");
let timeBox = document.querySelector(".time");
let bestScoreBox = document.querySelector(".best-score");
let lastScore = 0;
let bestScore = 0;
let score;
let time;
let names = [
  "hetic",
  "chrome",
  "javascript",
  "frontend",
  "framework",
  "canvas",
  "html",
  "css",
  "library",
  "terminal",
  "bash",
  "figma",
  "sketch",
  "npm",
  "sass",
  "internet",
  "class",
  "semantic",
  "fullstack",
  "UX",
  "UI",
  "design",
  "firefox",
  "ASCII",
  "cookie",
  "header",
  "php",
  "sql",
  "backend",
  "indent",
  "codepen",
  "database"
];

function init() {
  time = 30;
  score = 0;
  timeBox.innerHTML = time;
  updateTime();
  newWord();
}

function updateTime() {
  timeBox.innerHTML = time;
  time--;
  if (time > -1) {
    setTimeout(updateTime, 1000);
  } else {
    lastScore = score;
    if (lastScore > bestScore) {
      bestScore = lastScore;
    }
    init();
  }
}

function newWord() {
  input.style.border = "3px solid #2c3e50";
  if (!nextWord) {
    currentWord = names[Math.floor(Math.random() * names.length)];
    nextWord = names[Math.floor(Math.random() * names.length)];
  } else {
    currentWord = nextWord;
    nextWord = names[Math.floor(Math.random() * names.length)];
  }
  currentBox.innerHTML = currentWord;
  nextBox.innerHTML = nextWord;
}

input.addEventListener("keyup", function() {
  if (input.value === "") {
    input.style.border = "3px solid #2c3e50";
  } else if (input.value === currentWord) {
    score++;
    input.value = null;
    newWord();
  } else {
    for (let i = 0; i < input.value.length; i++) {
      const letter = input.value[i];
      if (letter == currentWord[i]) {
        input.style.border = "3px solid #2ecc71";
      } else {
        input.style.border = "3px solid #e74c3c";
      }
    }
  }
});

init();
