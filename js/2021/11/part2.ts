export default (file: string) => {
	const grid: number[][] = file
		.split('\n')
		.map((line) => line.split('').map(Number));

	const flash = (x: number, y: number, grid: number[][]): void => {
		if (grid[y][x] <= 9 || grid[y][x] === 0) return;

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
						flash(dx, dy, grid);
					}
				}
			}
		}
	};

	const step = (grid: number[][]): boolean => {
		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				grid[y][x] += 1;
			}
		}

		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				flash(x, y, grid);
			}
		}

		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid.length; x++) {
				if (grid[y][x] !== 0) {
					return false;
				}
			}
		}

		return true;
	};

	let i = 0;

	while (true) {
		i += 1;
		if (step(grid)) {
			break;
		}
	}

	return i;
};
