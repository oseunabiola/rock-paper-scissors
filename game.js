const PAPER = "paper";
const ROCK = "rock";
const SCISSORS = "scissors";
let winningLine = 5;
let playerWin = 0;
computerWin = 0;

const startGame = document.querySelector("#startGame");
const startModal = document.querySelector("#startModal");
const statusMessage = document.querySelector("#statusMessage");
const objects = document.querySelectorAll(".object");

const objectslength = objects.length;
for (let i = 0; i < objectslength; i++) {
  objects[i].addEventListener("click", function () {
    playRound(objects[i].dataset.object, computerPlay());
  });
}
startGame.addEventListener("click", function () {
  startModal.classList.add("start-hidden");
  statusMessage.classList.remove("start-round");
  statusMessage.classList.add("round-message");
  setStatusMessage("Make a selection");
});

function computerPlay() {
  let cards = [ROCK, PAPER, SCISSORS];
  let randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}
function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();

  let paperWeight = [ROCK, SCISSORS];
  let rockWeight = [SCISSORS, PAPER];
  let scissorsWeight = [PAPER, ROCK];

  let result;
  switch (computerSelection) {
    case PAPER:
      if (playerSelection === PAPER) {
        result = "Draw! Computer chose paper too";
      } else if (playerSelection === ROCK) {
        result = "You Lose! Paper beats Rock";
      } else {
        result = "You Won! Scissors beats Paper";
      }
      break;
    case ROCK:
      if (playerSelection === ROCK) {
        result = "Draw! Computer chose rock too";
      } else if (playerSelection === SCISSORS) {
        result = "You Lose! Rock beats Scissors";
      } else {
        result = "You Won! Paper beats Rock";
      }
      break;
    case SCISSORS:
      if (playerSelection === SCISSORS) {
        result = "Draw! Computer chose scissors too";
      } else if (playerSelection === PAPER) {
        result = "You Lose! Scissors beats Paper";
      } else {
        result = "You Won! Rock beats Scissors";
      }
      break;

    default:
      break;
  }
  setStatusMessage(result);
  computeScore(result);
  console.log(result);
  return result;
}

function computeScore(result) {
  result.startsWith("You Won") ? playerWin++ : computerWin++;
  updateScore();
  return;
}
function updateScore() {
  if (playerWin >= 5 || computerWin >= 5) gameOver();

  document.querySelector("#youScore").textContent = playerWin;
  document.querySelector("#compScore").textContent = computerWin;
}
function gameOver() {
  playerWin > computerWin
    ? setStatusMessage("You Won!")
    : setStatusMessage("You Lose!");

  playerWin = 0;
  computerWin = 0;

  startModal.classList.remove("start-hidden");
  statusMessage.classList.add("start-round");
  statusMessage.classList.remove("round-message");

  startGame.textContent = "Play Again";
}
function setStatusMessage(message = "Make a selection") {
  statusMessage.textContent = message;
}
