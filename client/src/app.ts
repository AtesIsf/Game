import {Helpers} from "./helpers.js";
import {Entity} from "./entity.js";

const canvas = document.getElementById("game") as HTMLCanvasElement;
canvas.width = window.outerWidth;
canvas.height = window.outerHeight;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";1

Helpers.drawGrid(ctx, 10, 10);

let e = new Entity("infantry", 2, 1);

window.onload = () => {
	e.draw(ctx);
}

window.onclick = () => {
	e.moveAnimation(ctx, 5, 8);
}

