import {Entity} from "./entity.js";

export namespace Helpers {
	export let entities: Entity[] = []; 
	export let gridStartMargin = 80;
	export let nRows = 10;
	export let nCols = 10;
	let sideLen = 40;

	const magicRatio = 0.875; // Magic ratio found by trial-error
	const magicYRatio = 1.7; // Magic ratio found by trial-error

	const hexWidth = sideLen * Math.sqrt(3);

	let hexCoords: Map<string, number[]> = new Map; // 2d array of tuples

	// Cam stuff
	let offsetX = 0;
	let offsetY = 0;
	let speed = [0, 0];

	let keys = {
		w: false,
		a: false,
		s: false,
		d: false
	}

	export function setupInputs() {
		window.onkeydown = (e) => {
			switch (e.key) {
				case "w":
					keys.w = true;
					break;
				case "a":
					keys.a = true;
					break;
				case "s":
					keys.s = true;
					break;
				case "d":
					keys.d = true;
					break;
			}	
		};

		window.onkeyup = (e) => {
			switch (e.key) {
				case "w":
					keys.w = false;
					speed[1] = 0;
					break;
				case "a":
					keys.a = false;
					speed[0] = 0;
					break;
				case "s":
					keys.s = false;
					speed[1] = 0;
					break;
				case "d":
					keys.d = false;
					speed[0] = 0;
					break;
			}	
		};

		requestAnimationFrame(handleMovement);
	}

	function handleMovement() {
		offsetX += speed[0];
		offsetY += speed[1];

		if (keys.w) speed[1] = 10;
		if (keys.s) speed[1] = -10;
		if (keys.a) speed[0] = 10;
		if (keys.d) speed[0] = -10;

		requestAnimationFrame(handleMovement);
	}

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

	export function drawEntity(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number) {
		const abs = hexCoords.get(`${x}-${y}`);
		if (abs == null)
			return;
		// + 15 is a buffer here to make kinda center sprites
		ctx.drawImage(img, abs[0] + 15, abs[1], sideLen, sideLen);
	}

	function drawGrid(ctx: CanvasRenderingContext2D) {
		let x: number;
		let y = gridStartMargin;
		const delta = sideLen * magicRatio; 

		for (let i = 0; i < nRows; i++) {
			x = i % 2 == 0 ? gridStartMargin + delta : gridStartMargin;
			for (let j = 0; j < nCols; j++) {
				drawHexagon(ctx, x, y);
				hexCoords.set(`${i}-${j}`, [x - hexWidth / 2, y - sideLen / 2]);
				x += 2 * delta;
			}
			y += magicYRatio * delta; // Magic ratio found by trial-error
		}
	}

	export function draw(ctx: CanvasRenderingContext2D) {
		function inner() {
			ctx.fillStyle = "rgb(50, 50, 50)";
			ctx.clearRect(0, 0, window.outerWidth, window.outerHeight);

			ctx.save();

			ctx.translate(offsetX, offsetY);

			drawGrid(ctx);
			entities.forEach(e => {
				e.draw(ctx);
			});

			ctx.restore();

			requestAnimationFrame(inner);
		}
		requestAnimationFrame(inner);
	}
}
