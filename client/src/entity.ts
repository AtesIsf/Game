import {Helpers} from "./helpers.js";

let idTracker = 0;

export class Entity {
	img: HTMLImageElement;
	x: number;
	y: number;
	id: number;

	constructor(sprite: string, x: number, y: number) {
		this.x = x;
		this.y = y;
		this.id = idTracker++;
		this.img = new Image();
		this.img.srcset = `../assets/${sprite}.png`;
	}

	draw(ctx: CanvasRenderingContext2D) {
		Helpers.drawEntity(ctx, this.img, this.x, this.y);
	}

	moveTo(destX: number, destY: number) {
		this.x = destX;
		this.y = destY;
	}
}
