import playerBoard from "./playerBoard.js";
import computerBoard from "./computerBoard.js";
import render from "./render.js";

const playerContainer = document.querySelector(".player-container");
const computerContainer = document.querySelector(".computer-container");

const eventHandler = (function () {
  function hitListener() {
    playerContainer.addEventListener("click", (event) => {
      const cell = event.target.closest(".cell");

      if (!cell || !playerContainer.contains(cell)) return;

      const cellX = Number(cell.dataset.x);
      const cellY = Number(cell.dataset.y);

      const result = playerBoard.attack(cellX, cellY);
      console.log(result);

      render.board(playerBoard.getBoard(), playerContainer);
    });

    computerContainer.addEventListener("click", (event) => {
      const cell = event.target.closest(".cell");

      if (!cell || !computerContainer.contains(cell)) return;

      const cellX = Number(cell.dataset.x);
      const cellY = Number(cell.dataset.y);

      const result = computerBoard.attack(cellX, cellY);
      console.log(result);

      render.board(computerBoard.getBoard(), computerContainer);
    });
  }

  return { hitListener };
})();

export default eventHandler;
