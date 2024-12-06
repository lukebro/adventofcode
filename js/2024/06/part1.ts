export default (input: string) => {
	const map = input.split('\n').map((line) => line.split(''));

	let x: number, y: number;

	for (let j = 0; j < map.length; ++j) {
		for (let i = 0; i < map[j].length; ++i) {
			if (map[j][i] === '^') {
				map[j][i] = '.';
				y = j;
				x = i;
			}
		}
	}

	const key = (x: number, y: number) => `${x},${y}`;

	const visited = new Set<string>();

	visited.add(key(x, y));

	let dir = [0, -1];

	const turn = () => {
		const [dx, dy] = dir;
		dir[0] = -dy;
		dir[1] = dx;
	};

	while (y >= 0 && y < map.length && x >= 0 && map[0].length) {
		const [dx, dy] = dir;

		x += dx;
		y += dy;

		const next = map?.[y]?.[x];

		if (next === undefined) {
			break;
		}

		if (next === '.') {
			visited.add(key(x, y));
			continue;
		}

		// undo
		x -= dx;
		y -= dy;

		turn();
	}

	// for (let j = 0; j < map.length; ++j) {
	// 	for (let i = 0; i < map[j].length; ++i) {
	// 		const k = key(i, j);
	// 		const v = map[j][i];
	// 		if (v === '.' && visited.has(k)) {
	// 			process.stdout.write('X');
	// 		} else {
	// 			process.stdout.write(v);
	// 		}
	// 	}
	// 	process.stdout.write('\n');
	// }

	return visited.size;
};
