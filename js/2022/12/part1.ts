export default (file: string) => {
	const { grid, start, end } = parse(file);

	return findShortestPath(grid, start, end);
};

export function parse(file: string) {
	let start;
	let end;

	const grid = file.split('\n').map((line, y) => {
		return line.split('').map((c, x) => {
			if (c === 'S') {
				start = [x, y];
				return 0;
			} else if (c === 'E') {
				end = [x, y];
				return 25;
			}

			return c.charCodeAt(0) - 'a'.charCodeAt(0);
		});
	});

	return { start, end, grid };
}

type Coord = [number, number];

export function getNeighbors(grid, coord: Coord): Coord[] {
	const [x, y] = coord;
	const value = grid[y][x];
	const options = [
		[x + 1, y],
		[x - 1, y],
		[x, y + 1],
		[x, y - 1],
	];

	return options.filter(([x, y]) => {
		if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) {
			return false;
		}

		return grid[y][x] - value <= 1;
	}) as Coord[];
}

const key = (coord: Coord) => `${coord[0]},${coord[1]}`;

// implementation https://en.wikipedia.org/wiki/Breadth-first_search
export const findShortestPath = (grid, start: Coord, end: Coord) => {
	const explored = new Set<String>();
	const queue = [];

	explored.add(key(start));
	queue.push([start, 0]);

	while (queue.length !== 0) {
		const [v, len] = queue.shift();

		if (v[0] === end[0] && v[1] === end[1]) {
			return len;
		}

		const neighbors = getNeighbors(grid, v);

		for (const neighbor of neighbors) {
			const k = key(neighbor);
			if (!explored.has(k)) {
				explored.add(k);
				queue.push([neighbor, len + 1]);
			}
		}
	}

	return Infinity;
};
