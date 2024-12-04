export default (input: string) => {
	const grid = input.split('\n').map((line) => line.split(''));

	let count = 0;

	function walk(
		slope: [number, number],
		coords: [number, number],
		remainder: string,
	) {
		if (remainder.length === 0) {
			count += 1;
			return;
		}
		const [x, y] = coords;
		const [dx, dy] = slope;

		const letter = remainder[0];

		if (grid?.[y + dy]?.[x + dx] === letter) {
			walk(slope, [x + dx, y + dy], remainder.slice(1));
		}
	}

	function castInAllDirections(x: number, y: number, remainder: string) {
		for (let i = -1; i < 2; ++i) {
			for (let j = -1; j < 2; ++j) {
				if (i === 0 && j === 0) {
					continue;
				}

				walk([i, j], [x, y], remainder);
			}
		}
	}

	for (let y = 0; y < grid.length; ++y) {
		for (let x = 0; x < grid[y].length; ++x) {
			const letter = grid[y][x];

			if (letter === 'X') {
				castInAllDirections(x, y, 'MAS');
			}
		}
	}

	return count;
};
