//Lista med random ord
const randowWordArr = ["SCHOOL", "FRONTEND", "DEVELOPER", "BACKEND", "DESIGN"];
//Lista med alfabetet
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
//Lista med använda bokstäver
let wrongLetters = [];
//max fel gissningar
let maxWrongGuesses = 5;
//Variabel för att kolla när man gissat rätt.
let guessesUntilWin;
//Poängräknare
let points = 0;
//Variabel som random ordet sparas i
let randomWord;
//Array med de olika kroppsdelarna
let bodyparts = ["scaffold", "head", "body", "arms", "legs"];
//Variabel för att disabla knappar vid vinst/förlust
let disableKeys = false;

const noMatchContainer = document.querySelector(".nomatch");
const wordContainer = document.querySelector(".word");
const restartBtn = document.querySelector(".game-over a");
const playAgainBtn = document.querySelector("#play-again-btn");

///////////////////////-----EVENT-LISTENERS-----////////////////////////

restartBtn.addEventListener("click", restartGame);
playAgainBtn.addEventListener("click", restartGame);

document.addEventListener("keydown", (e) => {
  const keyPressed = e.key.toUpperCase();
  if (disableKeys === false) {
    checkKeyPress(keyPressed);
  }
});

/////////////////////////-----FUNCTIONS-----//////////////////////////

//Generera random ord från randomWordArr. Funktion körs vid laddning av sida för att starta spelet direkt.
function generateRandomWord() {
  randomWord = randowWordArr[Math.floor(Math.random() * randowWordArr.length)];
  renderEmptyBoxes(randomWord);
}
generateRandomWord();

//Rendera ett antal tomma av dessa beroende längd av ord
function renderEmptyBoxes(word) {
  guessesUntilWin = word.length;
  wordContainer.innerHTML = ``;
  for (let i = 0; i < word.length; i++) {
    wordContainer.innerHTML += `<li id="char${i}"></li>`;
  }
}

//Logik för key press
function checkKeyPress(keypress) {
  if (alphabet.includes(keypress)) {
    alphabet.splice(alphabet.indexOf(keypress), 1);
    if (randomWord.includes(keypress)) {
      correctKeypress(keypress);
    } else if (!randomWord.includes(keypress)) {
      wrongKeypress(keypress);
    }
  }
}

//Om keypress finns med i ordet
function correctKeypress(keypress) {
  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === keypress) {
      document.getElementById(`char${i}`).textContent = keypress;
      guessesUntilWin--;
      //Vid vinst
      if (guessesUntilWin === 0) {
        points += 100;
        document.querySelector(".you-won").classList.add("show");
        disableKeys = true;
        updateUI();
      }
    }
  }
}

//Om keypress inte finns med
function wrongKeypress(keypress) {
  if (points > 0) {
    points -= 10;
  }
  wrongLetters.push(keypress);
  renderWrongGuess();
  maxWrongGuesses--;
  renderSvg();
}

//Renderar kroppdelarna
function renderSvg() {
  document.querySelector("figure").classList.add(`${bodyparts[0]}`);
  bodyparts.shift();
  updateUI();
  if (maxWrongGuesses === 0) {
    document.querySelector(".game-over").classList.add("show");
    points = 0;
    disableKeys = true;
    updateUI();
  }
}

//Om fel gissning, pusha bokstav in i wrongLetters och rendera in i nomatch
function renderWrongGuess() {
  noMatchContainer.innerHTML = ``;
  for (char of wrongLetters) {
    noMatchContainer.innerHTML += `${char} `;
  }
}

//Uppdaterar element i UI
function updateUI() {
  document.querySelector(".game-over p b").textContent = randomWord;
  document.querySelector(".you-won p b").textContent = randomWord;
  document.getElementById("wrong-guesses").textContent = maxWrongGuesses;
  document.querySelector("#points").textContent = points;
  document.querySelector("#current-score").textContent = points;
}

//Starta om spelet
function restartGame() {
  document.querySelector(".game-over").classList.remove("show");
  document.querySelector(".you-won").classList.remove("show");
  document.querySelector("figure").className = "";
  maxWrongGuesses = 5;
  guessesMade = 0;
  wrongLetters = [];
  noMatchContainer.innerHTML = ``;
  randomWord = ``;
  alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split("");
  bodyparts = ["scaffold", "head", "body", "arms", "legs"];
  updateUI();
  generateRandomWord();
  disableKeys = false;
}
