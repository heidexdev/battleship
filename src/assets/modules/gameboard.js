function gameBoard(name) {
  return {
    name: name,
    board: [
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
    ],
    ships: [],
    placeShip(ship, corX, corY, direction = "vertical") {
      if (corX < 0 || corX >= 10 || corY < 0 || corY >= 10) return false;

      if (direction !== "vertical" && direction !== "horizontal") {
        return false;
      }

      if (direction === "vertical") {
        for (let i = 0; i < ship.length; i++) {
          const x = corX + i;

          if (x >= 10 || this.board[x][corY] !== null) return false;
        }

        for (let i = 0; i < ship.length; i++) {
          this.board[corX + i][corY] = ship;
        }
        this.ships.push(ship);
      }

      if (direction === "horizontal") {
        for (let i = 0; i < ship.length; i++) {
          const y = corY + i;

          if (y >= 10 || this.board[corX][y] !== null) return false;
        }

        for (let i = 0; i < ship.length; i++) {
          this.board[corX][corY + i] = ship;
        }
        this.ships.push(ship);
      }

      return true;
    },
    attack(x, y) {
      const attackCell = this.board[x][y];
      if (attackCell === null) {
        this.board[x][y] = "miss";
        return "miss";
      }
      if (attackCell === "hit" || attackCell === "miss") {
        return "already attacked";
      } else {
        attackCell.hit();
        this.board[x][y] = "hit";
        if (attackCell.isSunk()) {
          return "hit and sunk";
        } else {
          return "hit";
        }
      }
    },
    isGameEnded() {
      return this.ships.every((ship) => ship.isSunk());
    },
    getBoard() {
      return this.board;
    },
  };
}
export default gameBoard;
