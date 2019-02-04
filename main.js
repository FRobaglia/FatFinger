let input = document.querySelector("input");
let currentWord;
let span = document.querySelector(".current-word");
let scorebox = document.querySelector(".score");
let score = 0;
let names = [
  "haris",
  "suce",
  "bite",
  "couillasse",
  "trouduc",
  "julian",
  "felix",
  "pute",
  "salope"
];

function init() {
  newWord();
  updateScore();
}

function updateScore() {
  scorebox.innerHTML = score;
}
function newWord() {
  currentWord = names[Math.floor(Math.random() * names.length)];
  span.innerHTML = currentWord;
}

input.addEventListener("keyup", function() {
  if (input.value === currentWord) {
    input.style.border = "3px solid green";
  }
  else if (input.value === currentWord + " ") {
    score++;
    input.value = null;
    newWord();
    updateScore();
  } else {
    input.style.border = "3px solid red";
  }
});

init();
