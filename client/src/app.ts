import {Helpers} from "./helpers.js";

const canvas = document.getElementById("game") as HTMLCanvasElement;
canvas.width = window.outerWidth;
canvas.height = window.outerHeight;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";1

Helpers.drawGrid(ctx, 3, 3);
Helpers.drawEntity(ctx, "infantry.png", 2, 1);
Helpers.drawEntity(ctx, "tower.png", 1, 0);
