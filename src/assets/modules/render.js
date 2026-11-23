const render = (function () {
  function board(board, container, hideShips = false) {
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
        } else if (cell !== null && !hideShips) {
          cellElement.classList.add("ship");
        }

        container.appendChild(cellElement);
      });
    });
  }

  function selection(container, fleet) {
    container.innerHTML = `
      <h2>Your Fleet</h2>
      <p class="fleet-info">Select a ship to place</p>

      <div class="fleet-ships">
        ${fleet
          .map(
            (ship) => `
              <button
                class="ship-option"
                type="button"
                data-length="${ship.length}"
                data-ship="${ship.id}"
              >
                <span class="ship-name">${ship.name}</span>
                <span class="ship-preview">
                  ${Array(ship.length).fill("<span></span>").join("")}
                </span>
              </button>
            `,
          )
          .join("")}
      </div>

      <div class="direction-selection">
        <h3>Direction</h3>
        <button
          class="direction-btn active"
          type="button"
          data-direction="horizontal"
        >
          Horizontal
        </button>
        <button
          class="direction-btn"
          type="button"
          data-direction="vertical"
        >
          Vertical
        </button>
      </div>
    `;
  }

  return {
    board,
    selection,
  };
})();

export default render;
