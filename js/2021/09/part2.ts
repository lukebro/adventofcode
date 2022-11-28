import { product } from '@lib/utils';

export default (file: string) => {
	const heightmap = file.split('\n').map((line) => line.split('').map(Number));

	const getAdjacent = (x, y, heightmap) => {
		return [
			{ n: heightmap?.[y]?.[x - 1], x: x - 1, y },
			{ n: heightmap?.[y]?.[x + 1], x: x + 1, y },
			{ n: heightmap?.[y - 1]?.[x], x, y: y - 1 },
			{ n: heightmap?.[y + 1]?.[x], x, y: y + 1 },
		].filter((node) => {
			return node.n !== undefined && node.n !== 9;
		});
	};

	const key = (x, y) => `${x},${y}`;
	const visited = new Map();

	const getBasin = (x, y, heightmap) => {
		// we already have this do not count it
		if (heightmap[y][x] === 9 || visited.has(key(x, y))) {
			return 0;
		}

		// mark as visited
		visited.set(key(x, y), true);

		const adjacent = getAdjacent(x, y, heightmap);

		// start count at 1 to count itself
		let count = 1;

		for (const node of adjacent) {
			count += getBasin(node.x, node.y, heightmap);
		}

		return count;
	};

	let basinSizes = [];
	for (let y = 0; y < heightmap.length; y++) {
		for (let x = 0; x < heightmap[y].length; x++) {
			// if we've visited already we don't want to double count
			if (heightmap[y][x] !== 9 && !visited.has(key(x, y))) {
				basinSizes.push(getBasin(x, y, heightmap));
			}
		}
	}

	basinSizes = basinSizes.sort((a, b) => b - a);

	return product(basinSizes.slice(0, 3));
};
