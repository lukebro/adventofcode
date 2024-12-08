type Coord = [number, number];

export default (input: string) => {
	const map = input.split('\n').map((line) => line.split(''));

	const coords = new Map<string, Coord[]>();

	for (let y = 0; y < map.length; ++y) {
		for (let x = 0; x < map[y].length; ++x) {
			if (map[y][x] !== '.') {
				const result = coords.get(map[y][x]) ?? [];
				result.push([x, y]);
				coords.set(map[y][x], result);
			}
		}
	}

	const maxY = map.length;
	const maxX = map[0].length;

	const antinodes = new Set<string>();

	function walk(start: Coord, slope: Coord) {
		let [x, y] = start;
		const [dx, dy] = slope;

		while (x >= 0 && x < maxX && y >= 0 && y < maxY) {
			antinodes.add(key(x, y));
			x += dx;
			y += dy;
		}
	}

	for (const value of coords.values()) {
		for (let i = 0; i < value.length - 1; ++i) {
			for (let j = i + 1; j < value.length; ++j) {
				const one = value[i];
				const two = value[j];

				const slopeX = two[0] - one[0];
				const slopeY = two[1] - one[1];

				walk(one, [-slopeX, -slopeY]);
				walk(two, [slopeX, slopeY]);
			}
		}
	}

	// debug(map, antinodes);

	return antinodes.size;
};

function key(...args: number[]) {
	return `${args.join(',')}`;
}

function debug(map: any[][], antinodes: Set<string>) {
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			const k = key(x, y);

			if (antinodes.has(k)) {
				process.stdout.write('#');
			} else {
				process.stdout.write(map[y][x]);
			}
		}
		process.stdout.write('\n');
	}
}
