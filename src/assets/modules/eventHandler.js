import gameController from "./gameController.js";

const computerBoardEl = document.querySelector(".computer-board");
const dirBtns = document.querySelectorAll(".direction-btn");
const shipOptions = document.querySelectorAll(".ship-option");

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
  function selectionListener() {
    dirBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        btn.classList.add("active");
        const otherBtn = btn.nextElementSibling || btn.previousElementSibling;
        otherBtn.classList.remove("active");
      });
    });

    shipOptions.forEach((ship) => {
      ship.addEventListener("click", (e) => {
        const parent = ship.parentElement;
        Array.from(parent.children).forEach((child) => {
          child.classList.remove("selected");
        });
        ship.classList.add("selected");
      });
    });
  }
  return { hitListener, selectionListener };
})();

export default eventHandler;
