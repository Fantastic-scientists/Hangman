const Scoreboard = document.querySelector("footer").lastElementChild;
const guesses = document.getElementsByClassName("guesses")[0];
const scoreEl = document.getElementsByClassName("score")[0];
const wordEl = document.getElementsByClassName("word")[0];
const svgBodyParts = document.querySelectorAll(".body-parts");
const message = document.getElementsByClassName("game-over")[0];
const messageText = document.getElementsByClassName("message-text")[0];
const notification = document.querySelector(".notification");
const h1 = document.querySelector("h1");
const bEl = document.querySelector("b");
const gameResetBtn = document.getElementsByClassName("btn")[0];
const noMatchEl = document.getElementsByClassName("nomatch")[0];

let totalGuesses = 5;
let score = 100;
const words = ["coding", "javascript", "react", "microsoft", "chrome", "apple"];
const correctLetters = [];
const wrongLetters = [];
let randomWord = words[Math.floor(Math.random() * words.length)];

console.log(randomWord);

function gameOver(status) {
  message.style.display = "flex";
  if (status === "win") {
    h1.style.color = "green";
    h1.innerText = "🏆 YOU WON!! 🏆";

    messageText.innerText = `You have won with ${score} points DARE TO PLAY AGAIN?`;
  } else {
    h1.innerText = "Game over!";
    h1.style.color = "red";
    messageText.innerHTML = `The word we were looking for was <b> ${randomWord} </b>.`;
  }
}

function update() {
  noMatchEl.innerHTML =
    (wrongLetters.length > 0 ? "<p></p>" : "") +
    wrongLetters
      .map(function (letter) {
        return "<li>" + letter + "</li>";
      })
      .join("");

  svgBodyParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.opacity = 1;
    } else {
      part.style.opacity = 0;
    }
  });

  if (wrongLetters.length == svgBodyParts.length) {
    gameOver("lost");
  }
}

function warning() {
  notification.classList.add("show");
  setTimeout(hideNotification, 2000, notification);
}

function hideNotification(notification) {
  notification.classList.remove("show");
}

function upateGuess() {
  totalGuesses--;
  if (totalGuesses <= 0) {
    gameOver("lost");
  }
  guesses.textContent = "You have " + " " + totalGuesses + " Guesses Left";
}

function updateScore(guess) {
  if (guess === "correct") {
    score += 100;
    return score;
  } else if (guess === "wrong") {
    score -= 10;
    if (score <= 0) {
      gameOver("lost");
      Scoreboard.textContent = "You have 0 Points.";
    }
  }
  Scoreboard.textContent = "You have " + " " + score + " Points";
}

function runGame() {
  var splittedWord = randomWord.split("");
  var wordHTML = "";

  for (var i = 0; i < splittedWord.length; i++) {
    var letter = splittedWord[i];
    var letterHTML = "<li>";

    if (correctLetters.includes(letter)) {
      letterHTML += letter;
    }
    letterHTML += "</li>";
    wordHTML += letterHTML;
  }

  wordEl.innerHTML = wordHTML;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === randomWord) {
    updateScore("correct");
    gameOver("win");
  }

  guesses.textContent = "You have " + " " + totalGuesses + " Guesses Left";
}

window.addEventListener("keydown", function (e) {
  Scoreboard.textContent = `You have ${score} Points`;
  console.log(score);
  if (
    (e.code >= "KeyA" && e.code <= "KeyZ") ||
    e.code === "Å" ||
    e.code === "Ä" ||
    e.code === "Ö"
  ) {
    const letter = e.key.toLowerCase();
    if (randomWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        runGame();
      } else {
        warning();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        upateGuess();
        updateScore("wrong");
        update();
      } else {
        warning();
      }
    }
  }
});
function gameReset() {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  randomWord = words[Math.floor(Math.random() * words.length)];
  console.log(randomWord);
  totalGuesses = 5;
  message.style.display = "none";
  runGame();
  update();
}

gameResetBtn.addEventListener("click", function () {
  if (score > 0) {
    gameReset();
    updateScore("showScore");
  } else {
    gameReset();
    score = 100;
    updateScore("showScore");
  }
});

runGame();
