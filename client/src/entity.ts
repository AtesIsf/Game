import {Helpers} from "./helpers.js";

export class Entity {
	sprite: string;
	x: number;
	y: number;
	isMoving: boolean;

	constructor(sprite: string, x: number, y: number) {
		this.sprite = `${sprite}.png`;
		this.x = x;
		this.y = y;
		this.isMoving = false;
	}

	draw(ctx: CanvasRenderingContext2D) {
		Helpers.drawEntity(ctx, this.sprite, this.x, this.y, false);
	}

	moveAnimation(ctx: CanvasRenderingContext2D, destX: number, destY: number) {
		Helpers.animateMovement(ctx, this, destX, destY);
	}
}
