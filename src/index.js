import "./styles.css";
import gameBoard from "./assets/modules/gameboard.js";
import render from "./assets/modules/render.js";
import ship from "./assets/modules/ship.js";
const playerContainer = document.querySelector(".player-container");
const computerContainer = document.querySelector(".computer-container");

const playerBoard = gameBoard("player");
const computerBoard = gameBoard("computer");
render.board(playerBoard.getBoard(), playerContainer);
render.board(computerBoard.getBoard(), computerContainer);
