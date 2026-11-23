const playerBoard = (function () {
  function createEmptyBoard() {
    return Array.from({ length: 10 }, () => Array(10).fill(null));
  }

  let board = createEmptyBoard();
  let ships = [];

  function reset() {
    board = createEmptyBoard();
    ships = [];
  }

  function placeShip(ship, corX, corY, direction = "vertical") {
    if (
      !ship ||
      !Number.isInteger(corX) ||
      !Number.isInteger(corY) ||
      corX < 0 ||
      corX >= 10 ||
      corY < 0 ||
      corY >= 10
    ) {
      return false;
    }

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
    } else {
      for (let i = 0; i < ship.length; i++) {
        const y = corY + i;
        if (y >= 10 || board[corX][y] !== null) return false;
      }

      for (let i = 0; i < ship.length; i++) {
        board[corX][corY + i] = ship;
      }
    }

    ships.push(ship);
    return true;
  }

  function attack(x, y) {
    if (
      !Number.isInteger(x) ||
      !Number.isInteger(y) ||
      x < 0 ||
      x >= 10 ||
      y < 0 ||
      y >= 10
    ) {
      return "invalid";
    }

    const attackCell = board[x][y];

    if (attackCell === null) {
      board[x][y] = "miss";
      return "miss";
    }

    if (attackCell === "hit" || attackCell === "miss") {
      return "already attacked";
    }

    attackCell.hit();
    board[x][y] = "hit";

    return attackCell.isSunk() ? "hit and sunk" : "hit";
  }

  function isGameEnded() {
    return ships.length > 0 && ships.every((ship) => ship.isSunk());
  }

  function getBoard() {
    return board;
  }

  return {
    reset,
    placeShip,
    attack,
    isGameEnded,
    getBoard,
  };
})();

export default playerBoard;
