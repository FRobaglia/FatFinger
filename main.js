let input = document.querySelector(".game");
let nextWordBox = document.querySelector(".next-word");
let timeBox = document.querySelector(".time");
let currentWordBox = document.querySelector(".current-word");
let darkLightButton = document.querySelector(".light-dark");
let body = document.querySelector("body");

let currentWord;
let nextWord;

let timer = false;
let lastScore = 0;
let bestScore = 0;

let score;
let time;

let names = [
  "hetic",
  "chrome",
  "javascript",
  "front-end",
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
  "full-stack",
  "design",
  "firefox",
  "cookies",
  "parcel",
  "flex",
  "display",
  "header",
  "php",
  "sql",
  "back-end",
  "indentation",
  "codepen",
  "database",
  "function",
  "responsive",
  "svg",
  "variable",
  "loop",
  "IE11",
  "markdown",
  "github"
];

darkLightButton.addEventListener("click", function() {
  body.classList.toggle("dark");
  darkLightButton.classList.toggle("dark");
  input.classList.toggle('dark');
  if (input.classList.contains('dark')) {
    input.style.border = '3px solid whitesmoke';
  }
  else {
    input.style.border = '3px solid #1d2935';
  }
});

function init() {
  time = 30;
  score = 0;
  timeBox.innerHTML = time;
  newWord();
}

function startTimer() {
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
  lastScore = score;
  if (lastScore > bestScore) {
    bestScore = lastScore;
  }
  init();
}

function newWord() {
  if (input.classList.contains('dark')) {
    input.style.border = '3px solid whitesmoke';
  }
  else {
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

input.addEventListener("keyup", function() {
  if (!timer) {
    startTimer();
  }
  if (input.value === "") {
    if (input.classList.contains('dark')) {
      input.style.border = '3px solid whitesmoke';
    }
    else {
      input.style.border = '3px solid #1d2935';
    }
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

window.onload = function() {
  input.onpaste = function(e) {
    e.preventDefault();
  };
};

init();
