import { sum } from '../../lib/utils';

export default (input: string) => {
	const grid = input.split('\n').map((line) => line.split(''));

	let count = 0;

	function walk(
		slope: [number, number],
		coords: [number, number],
		remainder: string,
	) {
		let [x, y] = coords;
		const [dx, dy] = slope;

		while (remainder.length !== 0) {
			const letter = remainder[0];

			if (grid?.[y]?.[x] !== letter) {
				return 0;
			}

			remainder = remainder.slice(1);
			x += dx;
			y += dy;
		}

		return 1;
	}

	for (let y = 0; y < grid.length; ++y) {
		for (let x = 0; x < grid[y].length; ++x) {
			const letter = grid[y][x];

			if (
				letter === 'A' &&
				sum([
					walk([1, 1], [x - 1, y - 1], 'MAS'),
					walk([1, 1], [x - 1, y - 1], 'SAM'),
					walk([-1, 1], [x + 1, y - 1], 'MAS'),
					walk([-1, 1], [x + 1, y - 1], 'SAM'),
				]) === 2
			) {
				count += 1;
			}
		}
	}

	return count;
};
