export default (file: string) => {
	const grid: number[][] = file
		.split('\n')
		.map((line) => line.split('').map(Number));

	const flash = (x: number, y: number, grid: number[][]): number => {
		if (grid[y][x] <= 9 || grid[y][x] === 0) return 0;

		let flashes = 1;
		grid[y][x] = 0;

		for (let dy = y - 1; dy <= y + 1; dy++) {
			for (let dx = x - 1; dx <= x + 1; dx++) {
				if (dx === x && dy === y) {
					continue;
				}

				if (grid?.[dy]?.[dx] !== undefined) {
					// it has already flashed
					if (grid[dy][dx] === 0) continue;

					grid[dy][dx] += 1;

					if (grid[dy][dx] > 9) {
						flashes += flash(dx, dy, grid);
					}
				}
			}
		}

		return flashes;
	};

	const step = (grid: number[][]): number => {
		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				grid[y][x] += 1;
			}
		}

		let flashes = 0;

		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				flashes += flash(x, y, grid);
			}
		}

		return flashes;
	};

	let flashes = 0;
	for (let i = 0; i < 100; i++) {
		flashes += step(grid);
	}

	return flashes;
};
