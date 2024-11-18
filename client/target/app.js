import { Helpers } from "./helpers.js";
const canvas = document.getElementById("game");
canvas.width = window.outerWidth;
canvas.height = window.outerHeight;
const ctx = canvas.getContext("2d");
Helpers.drawGrid(ctx, 80, 80, 3, 3);
