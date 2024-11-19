import {Helpers} from "./helpers.js";
import {Entity} from "./entity.js";

const canvas = document.getElementById("game") as HTMLCanvasElement;
canvas.width = window.outerWidth;
canvas.height = window.outerHeight;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";1

Helpers.entities.push(new Entity("infantry", 2, 1));
Helpers.entities.push(new Entity("tower", 1, 8));

window.onload = () => {
	Helpers.drawGrid(ctx);
	Helpers.entities.forEach(e => {
		e.draw(ctx)
	});
}

window.onclick = () => {
	Helpers.entities[0].moveAnimation(ctx, 5, 8);
}

