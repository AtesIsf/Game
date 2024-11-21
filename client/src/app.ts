import {Helpers} from "./helpers.js";
import {Entity} from "./entity.js";

const canvas = document.getElementById("game") as HTMLCanvasElement;
canvas.width = window.outerWidth;
canvas.height = window.outerHeight;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";1

Helpers.nRows = 20;
Helpers.nCols = 20;

Helpers.entities.push(new Entity("infantry", 18, 18));
Helpers.entities.push(new Entity("tower", 9, 9));

window.onload = () => {
	Helpers.draw(ctx);
}

