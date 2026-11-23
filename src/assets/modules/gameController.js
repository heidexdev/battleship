import playerBoard from "./playerBoard.js";
import computerBoard from "./computerBoard.js";
import createShip from "./createShip.js";
import render from "./render.js";

const playerContainer = document.querySelector(".player-container");
const computerContainer = document.querySelector(".computer-container");

const gameController = (function () {
  let turn = "player";
  function setup() {
    // Place player's ships
    playerBoard.placeShip(createShip(3), 0, 0, "horizontal");

    // Place computer's ships
    computerBoard.placeShip(createShip(3), 4, 3, "horizontal");

    // Initial rendering
    render.board(playerBoard.getBoard(), playerContainer);
    render.board(computerBoard.getBoard(), computerContainer, true);
  }

  function playerAttack(x, y) {
    if (turn === "computer") return;

    const result = computerBoard.attack(x, y);

    if (result !== "already attacked") {
      turn = "computer";
      computerAttack(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      );
    }
    render.board(computerBoard.getBoard(), computerContainer, true);

    return result;
  }

  function computerAttack(x, y) {
    const result = playerBoard.attack(x, y);

    if (result === "already attacked") {
      return computerAttack(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      );
    } else {
      render.board(playerBoard.getBoard(), playerContainer);
      turn = "player";
      return result;
    }
  }

  function isGameOver() {
    return playerBoard.isGameEnded() || computerBoard.isGameEnded();
  }
  return {
    setup,
    playerAttack,
    computerAttack,
    isGameOver,
  };
})();

export default gameController;
