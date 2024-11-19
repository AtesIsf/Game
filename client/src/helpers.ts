import {Entity} from "./entity.js";

export namespace Helpers {
	export const gridStartMargin = 80;
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

	function gridToAbsCoord(x: number, y: number) {
		const delta = sideLen * magicRatio;

		let absX = gridStartMargin + (x - 1) * delta - sideLen / 2;
		absX = x % 2 == 0 ? absX + 2 * delta : absX;

		const absY = gridStartMargin + y * delta * magicYRatio + sideLen;

		return [absX, absY]
	}

	export function drawEntity(ctx: CanvasRenderingContext2D, filename: string, x: number, y: number, asAbs: boolean) {
		let absX = x;
		let absY = y;

		if (!asAbs) {
			const arr = gridToAbsCoord(x, y);
			absX = arr[0];
			absY = arr[1];
		}

		// TODO: Find a better way to store images, maybe a sprite hashmap
		const img = new Image();
		img.srcset = `../assets/${filename}`;
		img.onload = () => {
			ctx.drawImage(img, absX, absY, sideLen, sideLen);
		};
	}

	export function drawGrid(ctx: CanvasRenderingContext2D, row: number, col: number) {
		let x: number;
		let y = gridStartMargin;
		const delta = sideLen * magicRatio; 

		for (let i = 0; i < row; i++) {
			x = i % 2 == 0 ? gridStartMargin + delta : gridStartMargin;
			for (let j = 0; j < col; j++) {
				drawHexagon(ctx, x, y);
				x += 2 * delta;
			}
			y += magicYRatio * delta; // Magic ratio found by trial-error
		}
	}

	// TODO: Fix this
	export function animateMovement(ctx: CanvasRenderingContext2D, e: Entity, destX: number, destY: number) {
		e.isMoving = true;

		const absStart = gridToAbsCoord(e.x, e.y)
		const startX = absStart[0];
		const startY = absStart[1];

		const absDest = gridToAbsCoord(destX, destY);
		const deltaX = absDest[0] - startX;
		const deltaY = absDest[1] - startY;
		const startTime = performance.now();

		function animate(time: DOMHighResTimeStamp) {
			const elapsed = time - startTime;
			const t = Math.min(elapsed / 1500, 1); // 1.5s

			const tempX = startX + deltaX * t;
			const tempY = startY + deltaY * t;

			drawEntity(ctx, e.sprite, tempX, tempY, true);

			if (t < 1) {
				requestAnimationFrame(animate);
			}
			e.isMoving = false;
			e.x = destX;
			e.y = destY;
		}

		requestAnimationFrame(animate);
	}
}
