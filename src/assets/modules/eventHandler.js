import gameController from "./gameController.js";

const computerBoardEl = document.querySelector(".computer-board");
const playerBoardEl = document.querySelector(".player-board");
const selectionEl = document.querySelector(".selection");

const startButton = document.querySelector("#start-game");
const resetButton = document.querySelector("#reset-game");

const eventHandler = (function () {
  let selectedShipId = null;

  function init() {
    selectionEl.addEventListener("click", selectionListener);
    playerBoardEl.addEventListener("click", placeListener);
    computerBoardEl.addEventListener("click", hitListener);

    startButton.addEventListener("click", () => {
      gameController.startGame();
    });

    resetButton.addEventListener("click", () => {
      gameController.reset();

      selectedShipId = null;
    });
  }

  function selectionListener(event) {
    const randomBtn = event.target.closest(".random-placement-btn");

    if (randomBtn) {
      const result = gameController.randomPlacePlayerFleet();

      if (!result) return;

      selectedShipId = null;

      selectionEl.querySelectorAll(".ship-option").forEach((ship) => {
        ship.disabled = true;
        ship.classList.remove("selected");
      });

      selectionEl.querySelectorAll(".direction-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.direction === "horizontal");
      });

      startButton.disabled = !gameController.isPlacementComplete();

      return;
    }

    const directionBtn = event.target.closest(".direction-btn");

    if (directionBtn && selectionEl.contains(directionBtn)) {
      gameController.setDirection(directionBtn.dataset.direction);

      selectionEl.querySelectorAll(".direction-btn").forEach((btn) => {
        btn.classList.toggle("active", btn === directionBtn);
      });

      return;
    }

    const shipButton = event.target.closest(".ship-option");

    if (
      !shipButton ||
      !selectionEl.contains(shipButton) ||
      shipButton.disabled
    ) {
      return;
    }

    const shipId = shipButton.dataset.ship;

    if (!gameController.selectShip(shipId)) return;

    selectedShipId = shipId;

    selectionEl.querySelectorAll(".ship-option").forEach((ship) => {
      ship.classList.toggle("selected", ship === shipButton);
    });
  }

  function placeListener(event) {
    const cell = event.target.closest(".cell");

    if (!cell || !playerBoardEl.contains(cell)) return;
    if (selectedShipId === null) return;

    const result = gameController.placePlayerShip(
      Number(cell.dataset.x),
      Number(cell.dataset.y),
    );

    if (!result) return;

    const selectedButton = selectionEl.querySelector(
      `[data-ship="${selectedShipId}"]`,
    );

    selectedButton.disabled = true;
    selectedButton.classList.remove("selected");

    selectedShipId = null;

    startButton.disabled = !gameController.isPlacementComplete();
  }

  function hitListener(event) {
    const cell = event.target.closest(".cell");

    if (!cell || !computerBoardEl.contains(cell)) return;

    gameController.playerAttack(Number(cell.dataset.x), Number(cell.dataset.y));
  }

  return { init };
})();

export default eventHandler;
