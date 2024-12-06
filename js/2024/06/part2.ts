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

	const key = (...args: number[]) => `${args.join(',')}`;

	const startX = x;
	const startY = y;

	let dir: [number, number] = [0, -1];
	const turn = (dir: [number, number]): [number, number] => {
		const [dx, dy] = dir;
		return [-dy, dx];
	};

	function isLooped(ax: number, ay: number) {
		let x = startX;
		let y = startY;

		const visited = new Set<string>();
		let dir: [number, number] = [0, -1];

		while (y >= 0 && y < map.length && x >= 0 && map[0].length) {
			const [dx, dy] = dir;
			const k = key(x, y, dx, dy);

			if (visited.has(k)) {
				return true;
			}

			const nextX = x + dx;
			const nextY = y + dy;

			const next = map?.[nextY]?.[nextX];

			if (next === undefined) {
				break;
			}

			if (next !== '.' || (nextX === ax && nextY === ay)) {
				dir = turn(dir);
				continue;
			}

			visited.add(k);

			x = nextX;
			y = nextY;
		}

		return false;
	}

	const blocker = new Set<string>();
	while (y >= 0 && y < map.length && x >= 0 && map[0].length) {
		const [dx, dy] = dir;

		const nextX = x + dx;
		const nextY = y + dy;

		const next = map?.[nextY]?.[nextX];

		if (next === undefined) {
			break;
		}

		if (next !== '.') {
			dir = turn(dir);
			continue;
		}

		if (!(nextX === startX && nextY === startY) && isLooped(nextX, nextY)) {
			blocker.add(key(nextX, nextY));
		}

		x = nextX;
		y = nextY;
	}

	return blocker.size;
};
