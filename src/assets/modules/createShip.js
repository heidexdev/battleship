function createShip(length) {
  return {
    length: length,
    hits: 0,
    hit() {
      this.hits++;
    },
    isSunk() {
      if (this.hits === this.length) {
        return true;
      } else return false;
    },
  };
}
export default createShip;
