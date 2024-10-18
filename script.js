document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const xWinsElem = document.getElementById("x-wins");
  const oWinsElem = document.getElementById("o-wins");
  const currentMove = document.getElementById("cur-move");
  const resetGameBtn = document.getElementById("reset-game");
  const resetScoreBtn = document.getElementById("reset-score");
  const gameBoard = document.getElementById("game-board");

  let board = Array(9).fill(null);
  let currentPlayer = "X";
  let isGameActive = true;
  let xWins = getCookie("xWins") || 0;
  let oWins = getCookie("oWins") || 0;

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

    if (checkWinner()) {
        currentMove.textContent = `Ход ${currentPlayer === "X" ? "крестиков" : "ноликов"} оказался решающим! Игра окончена.`;
    }
    else if (board.every(value => value !== null)) {
        currentMove.textContent = "Ничья! Эта битва была легендарной.";
        isGameActive = false;
    }
    else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        currentMove.textContent = currentPlayer === "X" ? "Ход крестиков" : "Ход ноликов";
    }
  }

  function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        roundWon = true;
        drawWinningLine(a, b, c);
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
      setCookie("xWins", xWins);
    } else {
      oWins++;
      oWinsElem.textContent = oWins;
      setCookie("oWins", oWins);
    }
  }

  function drawWinningLine(a, b, c) {
  const line = document.createElement("div");
  line.classList.add("line");

  const boardRect = gameBoard.getBoundingClientRect();
  const cellA = cells[a].getBoundingClientRect();
  const cellC = cells[c].getBoundingClientRect();

  const x1 = (cellA.left + cellA.right) / 2;
  const y1 = (cellA.top + cellA.bottom) / 2;
  const x2 = (cellC.left + cellC.right) / 2;
  const y2 = (cellC.top + cellC.bottom) / 2;


  const length = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  line.style.width = "0";
  line.style.height = "5px";
  line.style.backgroundColor = "red";
  line.style.position = "absolute";
  line.style.transformOrigin = "left center";
  line.style.top = `${y1 - boardRect.top}px`;
  line.style.left = `${x1 - boardRect.left}px`;
  line.style.transform = `rotate(${angle}deg)`;

  gameBoard.appendChild(line);

  setTimeout(() => {
    line.style.width = `${length}px`;
  }, 50);
}

  resetGameBtn.addEventListener("click", resetGame);
  resetScoreBtn.addEventListener("click", resetScore);

  function resetGame() {
    board.fill(null);
    cells.forEach(cell => (cell.textContent = ""));
    isGameActive = true;
	currentMove.textContent = currentPlayer === "X" ? "Ход крестиков" : "Ход ноликов";
    gameBoard.querySelectorAll(".line").forEach(line => line.remove());
  }

  function resetScore() {
    xWins = 0;
    oWins = 0;
    xWinsElem.textContent = xWins;
    oWinsElem.textContent = oWins;
    setCookie("xWins", xWins);
    setCookie("oWins", oWins);
  }

  function setCookie(name, value) {
    document.cookie = `${name}=${value}; path=/`;
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
});
