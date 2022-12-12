import { parse, findShortestPath } from './part1';

export default (file: string) => {
	const { grid, end } = parse(file);

	let shortest = Infinity;

	for (let y = 0; y < grid.length; ++y) {
		for (let x = 0; x < grid[0].length; ++x) {
			if (grid[y][x] !== 0) {
				continue;
			}
			const path = findShortestPath(grid, [x, y], end);
			shortest = Math.min(shortest, path);
		}
	}

	return shortest;
};
