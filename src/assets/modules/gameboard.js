import ship from "./ship.js";

const gameBoard = (function () {
  const board = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ];

  function placeShip(ship, corX, corY, direction = "vertical") {
    if (corX < 0 || corX >= 10 || corY < 0 || corY >= 10) return false;

    if (direction !== "vertical" && direction !== "horizontal") {
      return false;
    }

    if (direction === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        const x = corX + i;

        if (x >= 10 || board[x][corY] !== null) return false;
      }

      for (let i = 0; i < ship.length; i++) {
        board[corX + i][corY] = ship;
      }
    }

    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        const y = corY + i;

        if (y >= 10 || board[corX][y] !== null) return false;
      }

      for (let i = 0; i < ship.length; i++) {
        board[corX][corY + i] = ship;
      }
    }

    return true;
  }
  const ship1 = ship(3);
  placeShip(ship1, 0, 0, "horizontal");
  console.log(board);
  return { placeShip };
})();
