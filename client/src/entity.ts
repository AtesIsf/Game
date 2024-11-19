import {Helpers} from "./helpers.js";

let idTracker = 0;

export class Entity {
	sprite: string;
	x: number;
	y: number;
	id: number;

	constructor(sprite: string, x: number, y: number) {
		this.sprite = `${sprite}.png`;
		this.x = x;
		this.y = y;
		this.id = idTracker++;
	}

	draw(ctx: CanvasRenderingContext2D) {
		Helpers.drawEntity(ctx, this.sprite, this.x, this.y, false);
	}

	moveAnimation(ctx: CanvasRenderingContext2D, destX: number, destY: number) {
		Helpers.animateMovement(ctx, this, destX, destY);
	}
}
