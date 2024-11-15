
const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

ctx.fillStyle = "rgb(200 0 0)"
ctx.fillRect(10, 10, 50, 50);

ctx.fillStyle = "rgb(0 0 200)"
ctx.fillRect(30, 30, 50, 50);
