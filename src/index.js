import "./styles.css";
import playerBoard from "./assets/modules/playerBoard.js";
import computerBoard from "./assets/modules/computerBoard.js";
import eventHandler from "./assets/modules/eventHandler.js";
import render from "./assets/modules/render.js";
const playerContainer = document.querySelector(".player-container");
const computerContainer = document.querySelector(".computer-container");

render.board(playerBoard.getBoard(),playerContainer)
render.board(computerBoard.getBoard(),computerContainer)