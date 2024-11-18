export namespace Helpers {
	const sideLen = 40;
	
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

	export function drawGrid(ctx: CanvasRenderingContext2D, startX: number, startY: number, row: number, col: number) {
		let x: number;
		let y = startY;
		const delta = sideLen * 0.875; // Magic ratio found by trial-error
		for (let i = 0; i < row; i++) {
			x = i % 2 == 0 ? startX : startX + delta;
			for (let j = 0; j < col; j++) {
				drawHexagon(ctx, x, y);
				x += 2 * delta;
			}
			y += 1.7 * delta; // Magic ratio found by trial-error
		}
	}
}
