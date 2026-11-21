const computerBoard = (function () {
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
  const ships = [];
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
      ships.push(ship);
    }

    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        const y = corY + i;

        if (y >= 10 || board[corX][y] !== null) return false;
      }

      for (let i = 0; i < ship.length; i++) {
        board[corX][corY + i] = ship;
      }
      ships.push(ship);
    }

    return true;
  }
  function attack(x, y) {
    const attackCell = board[x][y];
    if (attackCell === null) {
      board[x][y] = "miss";
      return "miss";
    }
    if (attackCell === "hit" || attackCell === "miss") {
      return "already attacked";
    } else {
      attackCell.hit();
      board[x][y] = "hit";
      if (attackCell.isSunk()) {
        return "hit and sunk";
      } else {
        return "hit";
      }
    }
  }
  function isGameEnded() {
    return ships.every((ship) => ship.isSunk());
  }
  function getBoard() {
    return board;
  }
  return [placeShip, attack, isGameEnded, getBoard];
})();
export default computerBoard;