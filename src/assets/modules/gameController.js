import playerBoard from "./playerBoard.js";
import computerBoard from "./computerBoard.js";
import createShip from "./createShip.js";
import render from "./render.js";

const playerBoardEl = document.querySelector(".player-board");
const computerBoardEl = document.querySelector(".computer-board");
const selectionEl = document.querySelector(".selection");
const statusEl = document.querySelector("#game-status");
const startButton = document.querySelector("#start-game");

const gameController = (function () {
  const fleetDefinitions = [
    { id: "carrier", name: "Carrier", length: 5 },
    { id: "battleship", name: "Battleship", length: 4 },
    { id: "cruiser", name: "Cruiser", length: 3 },
    { id: "submarine", name: "Submarine", length: 3 },
    { id: "destroyer", name: "Destroyer", length: 2 },
  ];

  let playerFleet = [];
  let phase = "placement";
  let turn = "player";
  let selectedShipId = null;
  let direction = "horizontal";

  function updateStatus(message) {
    statusEl.textContent = message;
  }

  function setup() {
    reset();
  }

  function reset() {
    playerBoard.reset();
    computerBoard.placeFleet();

    playerFleet = fleetDefinitions.map((ship) => ({
      ...ship,
      ship: createShip(ship.length),
      placed: false,
    }));

    phase = "placement";
    turn = "player";
    selectedShipId = null;
    direction = "horizontal";

    render.selection(selectionEl, fleetDefinitions);
    render.board(playerBoard.getBoard(), playerBoardEl);
    render.board(computerBoard.getBoard(), computerBoardEl, true);

    selectionEl.hidden = false;
    startButton.disabled = true;

    updateStatus("Place all five ships to start the game.");
  }

  function selectShip(id) {
    if (phase !== "placement") return false;

    const selected = playerFleet.find((ship) => ship.id === id);

    if (!selected || selected.placed) return false;

    selectedShipId = id;
    return true;
  }

  function setDirection(newDirection) {
    if (phase !== "placement") return false;

    if (newDirection !== "horizontal" && newDirection !== "vertical") {
      return false;
    }

    direction = newDirection;
    return true;
  }

  function placePlayerShip(x, y) {
    if (phase !== "placement" || selectedShipId === null) {
      return false;
    }

    const selected = playerFleet.find((ship) => ship.id === selectedShipId);

    if (!selected || selected.placed) return false;

    const result = playerBoard.placeShip(selected.ship, x, y, direction);

    if (!result) {
      updateStatus("Invalid placement. Try another position.");
      return false;
    }

    selected.placed = true;
    selectedShipId = null;

    render.board(playerBoard.getBoard(), playerBoardEl);

    const placedCount = playerFleet.filter((ship) => ship.placed).length;

    if (isPlacementComplete()) {
      updateStatus("All ships placed! You can start the game.");
    } else {
      updateStatus(`${placedCount} / 5 ships placed.`);
    }

    return true;
  }

  function isPlacementComplete() {
    return playerFleet.every((ship) => ship.placed);
  }

  function startGame() {
    if (phase !== "placement" || !isPlacementComplete()) {
      return false;
    }

    phase = "playing";
    turn = "player";

    selectionEl.hidden = true;
    startButton.disabled = true;

    updateStatus("Your turn! Choose a cell on the enemy board.");

    return true;
  }

  function playerAttack(x, y) {
    if (phase !== "playing" || turn !== "player") {
      return;
    }

    const result = computerBoard.attack(x, y);

    if (result === "already attacked") {
      updateStatus("You already attacked that cell. Try another.");
      return result;
    }

    if (result === "invalid") return result;

    render.board(computerBoard.getBoard(), computerBoardEl, true);

    if (computerBoard.isGameEnded()) {
      phase = "over";
      updateStatus("You win! You destroyed the enemy fleet.");
      return result;
    }

    turn = "computer";
    updateStatus("Computer's turn...");

    setTimeout(computerTurn, 500);

    return result;
  }

  function computerTurn() {
    if (phase !== "playing" || turn !== "computer") return;

    let result;

    do {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      result = playerBoard.attack(x, y);
    } while (result === "already attacked");

    render.board(playerBoard.getBoard(), playerBoardEl);

    if (playerBoard.isGameEnded()) {
      phase = "over";
      updateStatus("Computer wins! Your fleet was destroyed.");
      return;
    }

    turn = "player";
    updateStatus("Your turn! Choose a cell on the enemy board.");
  }

  function isGameOver() {
    return phase === "over";
  }

  function getPhase() {
    return phase;
  }

  return {
    setup,
    reset,
    selectShip,
    setDirection,
    placePlayerShip,
    isPlacementComplete,
    startGame,
    playerAttack,
    isGameOver,
    getPhase,
  };
})();

export default gameController;
