import gameController from "./gameController.js";

const computerBoardEl = document.querySelector(".computer-board");
const dirBtns = document.querySelectorAll(".direction-btn");
const shipOptions = document.querySelectorAll(".ship-option");
const playerBoardEl = document.querySelector(".player-board");

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
  let direction = null;
  let length = null;
  function selectionListener() {
    dirBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        btn.classList.add("active");
        direction = btn.dataset.direction;
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
        length = Number(ship.dataset.length);
      });
    });
  }
  function placeListener() {
    playerBoardEl.addEventListener("click", (event) => {
      const cell = event.target.closest(".cell");

      if (!cell || !playerBoardEl.contains(cell)) return;
      if (direction === null|| length === null) return;

      const result = gameController.placeShip(
        length,
        cell.dataset.x,
        cell.dataset.y,
        direction,
      );
      if (result) {
        disableShip(length);
        length = null;
        direction = null;
      }
    });
  }
  function disableShip(length) {
    shipOptions.forEach((ship) => {
      ship.addEventListener("click", (e) => {
        if (Number(ship.dataset.length) === length) {
          ship.disabled = true;
          ship.classList.remove("selected");
        }
      });
    });
  }
  return { hitListener, selectionListener, placeListener };
})();

export default eventHandler;
