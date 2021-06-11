import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";

interface HexTile {
	x: number;
	y: number;
	food: number;
	production: number;
	gfx?: PIXI.Graphics;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
 function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function initAntioch(container: HTMLElement) {
	const [width, height] = [container.offsetWidth, container.offsetHeight];
	const app = new PIXI.Application({ width, height, antialias: !0, backgroundAlpha: 0, resolution: window.devicePixelRatio });
    container.innerHTML = "";
    container.appendChild(app.view);

	const viewport = new Viewport({
        screenWidth: width,
        screenHeight: height,
        worldWidth: width,
        worldHeight: height,
        passiveWheel: false,

        interaction: app.renderer.plugins.interaction
    });
    app.stage.addChild(viewport);

	viewport.drag({ factor: 1 });

	const [mapWidth, mapHeight] = [30, 20];
	const hexSize = 36; // side length
	const [hexWidth, hexHeight] = [hexSize * 2, Math.sqrt(3) * hexSize];
	let hexes: HexTile[][] = [];
	for (let y = 0; y < mapHeight; y++) {
		const row: HexTile[] = [];
		for (let x = 0; x < mapWidth; x++) row.push({ x, y, food: getRandomInt(0, 3), production: getRandomInt(0, 3) });
		hexes.push(row);
	}

	for (let x = 0; x < mapWidth; x++) {
		for (let y = 0; y < mapHeight; y++) {
			const hex = hexes[y][x];
			hex.gfx = new PIXI.Graphics();
			hex.gfx.lineStyle(1, 0xFFFFFF, 0.5);
			// hexGFX.beginFill(Math.random() * Math.pow(2, 24));
			hex.gfx.moveTo(hexSize * 1/2, hexHeight * 1/2);
			hex.gfx.lineTo(hexSize * -1/2, hexHeight * 1/2);
			hex.gfx.lineTo(hexSize * -1, 0);
			hex.gfx.lineTo(hexSize * -1/2, hexHeight * -1/2);
			hex.gfx.lineTo(hexSize * 1/2, hexHeight * -1/2);
			hex.gfx.lineTo(hexSize * 1, 0);
			hex.gfx.lineTo(hexSize * 1/2, hexHeight * 1/2);
			// hexGFX.endFill();

			const sprite = PIXI.Sprite.from("../assets/holy-hand-grenade.png");
			sprite.anchor.set(.5);
			sprite.scale.set(hex.production / 6);
			hex.gfx.addChild(sprite);

			viewport.addChild(hex.gfx);
			if (x % 2 === 0) hex.gfx.position.set(x * hexSize * 3/2, y * hexHeight);
			else hex.gfx.position.set(x * hexSize * 3/2, y * hexHeight + hexHeight/2);
		}
	}

	// const gridGFX = new PIXI.Graphics();
	// viewport.addChild(gridGFX);

	// for (let x = 0; x < mapWidth; x += 2) {
	// 	for (let y = 0; y < mapHeight; y++) {
	// 		gridGFX.lineStyle(1, 0xFFFFFF);

	// 		if (y === mapHeight - 1) {
	// 			gridGFX.moveTo(x * hexSize*3/2 + hexSize * 3/2, y * hexHeight + hexHeight);
	// 			gridGFX.lineTo(x * hexSize*3/2 + hexSize * 1/2, y * hexHeight + hexHeight);
	// 		} else {
	// 			gridGFX.moveTo(x * hexSize*3/2 + hexSize * 1/2, y * hexHeight + hexHeight);
	// 		}

	// 		gridGFX.lineTo(x * hexSize*3/2, y * hexHeight + hexHeight * 1/2);
	// 		gridGFX.lineTo(x * hexSize*3/2 + hexSize * 1/2, y * hexHeight);
	// 		gridGFX.lineTo(x * hexSize*3/2 + hexSize * 3/2, y * hexHeight);
	// 		gridGFX.lineTo(x * hexSize*3/2 + hexSize * 4/2, y * hexHeight + hexHeight * 1/2);
	// 		gridGFX.lineTo(x * hexSize*3/2 + hexSize * 3/2, y * hexHeight + hexHeight);
	// 		gridGFX.moveTo(x * hexSize*3/2 + hexSize * 4/2, y * hexHeight + hexHeight * 1/2);
	// 		gridGFX.lineTo(x * hexSize*3/2 + hexSize * 6/2, y * hexHeight + hexHeight * 1/2);

	// 		if (x === mapWidth - 2 && y < mapHeight - 1) {
	// 			gridGFX.lineTo(x * hexSize*3/2 + hexSize * 7/2, y * hexHeight + hexHeight);
	// 			gridGFX.lineTo(x * hexSize*3/2 + hexSize * 6/2, y * hexHeight + hexHeight * 3/2);
	// 		}
	// 	}
	// }

	// gridGFX.endFill();

	return {
		destroy: () => {
			console.log("Thy foe, being naughty in My sight, has snuffed it.");
		}
	};
}
