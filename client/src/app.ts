import {Helpers} from "./helpers.js";

const canvas = document.getElementById("game") as HTMLCanvasElement;
canvas.width = window.outerWidth;
canvas.height = window.outerHeight;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

Helpers.drawGrid(ctx, 80, 80, 3, 3);
