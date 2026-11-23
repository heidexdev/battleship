import gameController from "./gameController.js";

const computerBoardEl = document.querySelector(".computer-board");

const eventHandler = (function () {
  function hitListener() {
    computerBoardEl.addEventListener("click", (event) => {
      const cell = event.target.closest(".cell");

      if (!cell || !computerBoardEl.contains(cell)) return;

      const cellX = Number(cell.dataset.x);
      const cellY = Number(cell.dataset.y);

      const result = gameController.playerAttack(cellX, cellY);

      console.log(result);
      console.log("Game over:", gameController.isGameOver());
    });
  }

  return { hitListener };
})();

export default eventHandler;
