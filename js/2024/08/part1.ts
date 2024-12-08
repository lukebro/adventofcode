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

	for (const value of coords.values()) {
		for (let i = 0; i < value.length - 1; ++i) {
			for (let j = i + 1; j < value.length; ++j) {
				const one = value[i];
				const two = value[j];

				const slopeX = two[0] - one[0];
				const slopeY = two[1] - one[1];

				const left = [one[0] - slopeX, one[1] - slopeY];
				const right = [two[0] + slopeX, two[1] + slopeY];

				if (left[0] >= 0 && left[0] < maxX && left[1] >= 0 && left[1] < maxY) {
					antinodes.add(key(...left));
				}

				if (
					right[0] >= 0 &&
					right[0] < maxX &&
					right[1] >= 0 &&
					right[1] < maxY
				) {
					antinodes.add(key(...right));
				}
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
