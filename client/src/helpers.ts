import {Entity} from "./entity.js";

export namespace Helpers {
	export let entities: Entity[] = []; 
	export const gridStartMargin = 80;
	export const nRows = 10;
	export const nCols = 10;
	const sideLen = 40;
	const magicRatio = 0.875; // Magic ratio found by trial-error
	const magicYRatio = 1.7; // Magic ratio found by trial-error

	// The center of the hexagon is (startX, startY), sideLen = 40
	function drawHexagon(ctx: CanvasRenderingContext2D, startX: number, startY: number) {
		const theta = Math.PI / 3;
		let x = startX;
		let y = startY;

		ctx.beginPath();

		for (let i = 0; i < 6; i++) {
			ctx.lineTo(x + sideLen * Math.sin(theta * i), y + sideLen * Math.cos(theta * i));
		}

		ctx.closePath();
		ctx.stroke();
		ctx.fillStyle = "rgb(19, 133, 16)";
		ctx.fill();
	}

	// Todo: Fix this
	export function gridToAbsCoord(i: number, j: number) {
		const hexWidth = sideLen / (Math.sqrt(3) / 2);

		const pivotX = i % 2 == 0 ? gridStartMargin : gridStartMargin - sideLen / 2;
		const pivotY = gridStartMargin - sideLen / 2;
		const buff = 10; // Can be anything really

		return [pivotX + i * hexWidth + buff, pivotY + j * sideLen + buff];
	}

	export function drawEntity(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number) {
		const abs = gridToAbsCoord(x, y);

		ctx.drawImage(img, abs[1], abs[0], sideLen, sideLen);
	}

	function drawGrid(ctx: CanvasRenderingContext2D) {
		let x: number;
		let y = gridStartMargin;
		const delta = sideLen * magicRatio; 

		for (let i = 0; i < nRows; i++) {
			x = i % 2 == 0 ? gridStartMargin + delta : gridStartMargin;
			for (let j = 0; j < nCols; j++) {
				drawHexagon(ctx, x, y);
				x += 2 * delta;
			}
			y += magicYRatio * delta; // Magic ratio found by trial-error
		}
	}

	export function draw(ctx: CanvasRenderingContext2D) {
		function inner() {
			drawGrid(ctx);
			entities.forEach(e => {
				e.draw(ctx);
			});
			requestAnimationFrame(inner);
		}
		requestAnimationFrame(inner);
	}
}
