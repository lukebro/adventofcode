module.exports = (file) => {
	let lines = file.split('\n');
	let grid = lines.map((line) => line.split(''));

	/**
	 * Get first surrounding a col/row.
	 */
	const firstSeats = (grid, r1, c1) => {
		let first = 0;
		let colLen = grid[0].length;

		// vectors we need to travel
		// [row, col]
		let vectors = [
			[-1, -1], // top left
			[-1, 0], // top
			[-1, 1], // top right
			[0, -1], // left
			[0, 1], // right
			[1, -1], // bottom left
			[1, 0], // bottom
			[1, 1], // bottom right
		];

		// originally i had all these split into there own
		// while loop before realizing the pattern of the vector
		for (let [vr, vc] of vectors) {
			let c = c1 + vc;
			let r = r1 + vr;

			while (c >= 0 && r >= 0 && r < grid.length && c < colLen) {
				if (grid[r][c] === '.') {
					c += vc;
					r += vr;

					continue;
				}

				if (grid[r][c] === '#') {
					first += 1;
				}

				break;
			}
		}

		return first;
	};

	const rearrange = (grid) => {
		let changed = false;
		let next = [];

		for (let r = 0; r < grid.length; r++) {
			next.push([]);
			for (let c = 0; c < grid[r].length; c++) {
				let a = firstSeats(grid, r, c);
				let v = grid[r][c];

				if (v === 'L' && a === 0) {
					changed = true;
					next[r][c] = '#';
				} else if (v === '#' && a >= 5) {
					changed = true;
					next[r][c] = 'L';
				} else {
					next[r][c] = v;
				}
			}
		}

		return [changed, next];
	};

	let changing = true;
	let next = grid;

	// while it's still changing keep rearranging
	while (changing) {
		[changing, next] = rearrange(next);
	}

	let countOccupied = (grid) => {
		let o = 0;
		for (r in grid)
			for (c in grid[r])
				if (grid[r][c] === '#') {
					o += 1;
				}
		return o;
	};

	return countOccupied(next);
};
