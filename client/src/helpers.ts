import {Entity} from "./entity.js";

export namespace Helpers {
	export let entities: Entity[] = []; 
	
	// Drawing stuff
	export let gridStartMargin = 80;
	export let nRows = 100;
	export let nCols = 100;

	const magicRatio = 0.875; // Magic ratio found by trial-error
	const magicYRatio = 1.7; // Magic ratio found by trial-error

	let sideLen = 40;
	let hexWidth = sideLen * Math.sqrt(3);

	let hexCoords: Map<string, number[]> = new Map; // 2d array of tuples

	// Cam stuff
	let offsetX = 0;
	let offsetY = 0;
	let speed = [0, 0];
	let speedMul = 1;

	let keys = {
		w: false,
		a: false,
		s: false,
		d: false
	}

	export function setupInputs() {
		window.onkeydown = (e) => {
			switch (e.key) {
				// Movement
				case "W":
					speedMul = 2;
				case "w":
					keys.w = true;
					break;
				case "A":
					speedMul = 2;
				case "a":
					keys.a = true;
					break;
				case "S":
					speedMul = 2;
				case "s":
					keys.s = true;
					break;
				case "D":
					speedMul = 2;
				case "d":
					keys.d = true;
					break;
				// Zoom -> TODO: ADD OFFSET CORRECTION LATER
				case "+":
					if (sideLen < 70) {
						sideLen += 5;
						hexWidth = sideLen * Math.sqrt(3);
					}
					break;
				case "-":
					if (sideLen > 10) {
						sideLen -= 5;
						hexWidth = sideLen * Math.sqrt(3);
					}
					break;
				case " ":
					sideLen = 40;
					hexWidth = sideLen * Math.sqrt(3);
				break;
			}	
		};

		window.onkeyup = (e) => {
			switch (e.key) {
				case "W":
				case "w":
					speedMul = 1;
					keys.w = false;
					speed[1] = 0;
					break;
				case "A":
				case "a":
					speedMul = 1;
					keys.a = false;
					speed[0] = 0;
					break;
				case "S":
				case "s":
					speedMul = 1;
					keys.s = false;
					speed[1] = 0;
					break;
				case "D":
				case "d":
					speedMul = 1;
					keys.d = false;
					speed[0] = 0;
					break;
			}	
		};

		requestAnimationFrame(handleMovement);
	}

	function handleMovement() {
		if (keys.w) speed[1] = 10;
		if (keys.s) speed[1] = -10;
		if (keys.a) speed[0] = 10;
		if (keys.d) speed[0] = -10;

		offsetX += speed[0] * speedMul;
		offsetY += speed[1] * speedMul;

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
		// there is a buffer here to make kinda center sprites
		ctx.drawImage(img, abs[0] + sideLen * 2 / 5, abs[1], sideLen, sideLen);
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
