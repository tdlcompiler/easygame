document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const gameBoard = document.getElementById("game-board");

  let currentPlayer = "X";

  cells.forEach(cell => {
    cell.addEventListener("click", () => handleCellClick(cell));
  });

  function handleCellClick(cell) {
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
});
