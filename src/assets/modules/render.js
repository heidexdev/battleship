const render = (function () {
  function board(board, container) {
    container.innerHTML = "";

    board.forEach((row, x) => {
      row.forEach((cell, y) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.x = x;
        cellElement.dataset.y = y;

        if (cell === "hit") {
          cellElement.classList.add("hit");
        } else if (cell === "miss") {
          cellElement.classList.add("miss");
        } else if (cell !== null) {
          cellElement.classList.add("ship");
        }

        container.appendChild(cellElement);
      });
    });
  }
  return { board };
})();

export default render;
