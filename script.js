document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const xWinsElem = document.getElementById("x-wins");
  const oWinsElem = document.getElementById("o-wins");
  const gameBoard = document.getElementById("game-board");

let board = Array(9).fill(null);
  let currentPlayer = "X";
  let isGameActive = true;
  let xWins = 0;
  let oWins = 0;

  xWinsElem.textContent = xWins;
  oWinsElem.textContent = oWins;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  cells.forEach(cell => {
    cell.addEventListener("click", () => handleCellClick(cell));
  });

  function handleCellClick(cell) {
    const index = cell.getAttribute("data-index");

    if (board[index] || !isGameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      isGameActive = false;
      updateScore(currentPlayer);
    } else if (!board.includes(null)) {
      isGameActive = false;
    }
	
	return roundWon;
  }

  function updateScore(winner) {
    if (winner === "X") {
      xWins++;
      xWinsElem.textContent = xWins;
    } else {
      oWins++;
      oWinsElem.textContent = oWins;
    }
  }
});
