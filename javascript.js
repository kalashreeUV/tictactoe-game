let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;

let scoreX = 0;
let scoreO = 0;
let playerX = "";
let playerO = "";

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");
const nameXText = document.getElementById("nameX");
const nameOText = document.getElementById("nameO");
const finalResult = document.getElementById("final-result");

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function startGame() {
  const xName = document.getElementById("playerX").value.trim();
  const oName = document.getElementById("playerO").value.trim();

  if (!xName || !oName) {
    alert("Please enter both player names!");
    return;
  }

  playerX = xName;
  playerO = oName;
  nameXText.textContent = playerX;
  nameOText.textContent = playerO;

  document.getElementById("player-form").style.display = "none";
  document.getElementById("game-area").style.display = "block";
  statusText.textContent = `${playerX}'s turn (X)`;
  gameActive = true;
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer === "X" ? playerX : playerO}'s turn (${currentPlayer})`;
  }
}

function checkWinner() {
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      gameActive = false;
      highlightCells(condition);
      declareWinner(currentPlayer);
      return;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "😐 It's a Draw!";
    gameActive = false;
  }
}

function declareWinner(winner) {
  const name = winner === "X" ? playerX : playerO;
  statusText.textContent = `🎉 ${name} Wins!`;

  if (winner === "X") {
    scoreX++;
    scoreXText.textContent = scoreX;
  } else {
    scoreO++;
    scoreOText.textContent = scoreO;
  }
}

function highlightCells(indices) {
  indices.forEach(i => {
    cells[i].style.background = "rgba(0, 255, 231, 0.5)";
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  finalResult.textContent = "";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.background = "rgba(255, 255, 255, 0.1)";
  });
  statusText.textContent = `${playerX}'s turn (X)`;
}

function endGame() {
  gameActive = false;

  let winner = "", second = "";
  if (scoreX > scoreO) {
    winner = playerX;
    second = playerO;
  } else if (scoreO > scoreX) {
    winner = playerO;
    second = playerX;
  } else {
    finalResult.textContent = "🤝 It's a tie overall!";
    return;
  }

  finalResult.textContent = `🏆 1st Place: ${winner} | 🥈 2nd Place: ${second}`;
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
